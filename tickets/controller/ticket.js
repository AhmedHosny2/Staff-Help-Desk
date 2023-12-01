const ticketModel = require("../model/ticket");
const axios = require("axios");
const { OpenAI } = require("openai");
const { USER_BASE_URL } = require("../services/BaseURLs");
let unassignedTickets = [];
const { tickets } = require("../utils/botMessage");
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const assignTicketPriority = async (ticketIssue) => {
  console.log("assign ticket Priority started");
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "user", content: tickets + "Input: " + ticketIssue + "Output: " },
    ],
    model: "gpt-3.5-turbo",
  });
  const priority = completion.choices[0].message.content;
  console.log(priority);
  console.log("ticket Priority assigned");
  return priority;
};
const ticketIssue = `
    "category": "hardware",
    "description": "The server in our office is down, and we can't access critical files.",
`;

const assignTicket = async function (ticket) {
  // we will call function that sends the three agents ids and untilization
  let agents = await getAgentsData();
  let issueNumber =
    issue_type == "Software" ? 1 : issue_type == "Hardware" ? 2 : 3;

  if (agents[issueNumber - 1].utilization[issue_type] < 90) {
    return agents[issueNumber - 1].id;
  }
  agents.splice(issueNumber - 1, 1);
  if (agents[0].utilization[issue_type] <= 5) {
    return agents[0].id;
  }
  if (agents[1].utilization[issue_type] <= 5) {
    return agents[1].id;
  }
  return -1; // no agent available
};
//get agents data
const getAgentsData = async function () {
  // we will call function that sends the three agents ids and untilization
  let agents = [];
  await fetch(`${USER_BASE_URL}/agents`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    Credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      agents = data.data.map((agent) => {
        return {
          id: agent._id,
          utilization: agent.utilization,
        };
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return agents;
};
exports.getAlltickets = async (req, res) => {
  try {
    const tickets = await ticketModel.find();
    res.status(200).json({
      status: "success",
      data: tickets,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// ASSIGN TICKETS USING THE PYTHON ML MODEL
exports.assignTicket = async (req, res) => {
  try {
    // Extract necessary information from the request
    const { priority, type } = req.body;

    // Make a request to the Python ML model API
    const mlApiResponse = await axios.post(
      "http://localhost:5012/api/assignTicket",
      {
        priority,
        type,
      }
    );

    // Get the predicted agent from the ML model response
    const predictedAgent = mlApiResponse.data.predicted_agent;

    // Create a new ticket with the predicted agent
    const newTicket = {
      priority,
      type,
      agent: predictedAgent,
      // ... other ticket details
    };

    // Save the new ticket to the database
    const ticket = await ticketModel.create(newTicket);

    res.status(201).json({
      status: "success",
      data: {
        // ...ticket,
        predicted_agent: predictedAgent,
      },
    });
  } catch (err) {
    console.error("Error assigning ticket:", err);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const { createdUser, issue_type, sub_category, title, description } =
      req.body;
    let ticketAssigned = false;
    // TODO  the created user id must come from the auth service
    const newTicket = {
      createdUser,
      issue_type,
      sub_category,
      title,
      description,
    };
    const agentId = await assignTicket(issue_type);
    if (agentId != -1) {
      newTicket.agentId = agentId;
      ticketAssigned = true;
    }
    const ticket = await ticketModel.create(newTicket);
    if (!ticketAssigned) {
      unassignedTickets.push(ticket._id);
    }

    console.log("ticket created");
    res.status(201).json({
      status: "success",
      data: ticket,
    });
  } catch (err) {
    console.error("Error creating ticket:", err);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};

//Get user's tickets
exports.getUserTickets = async (req, res) => {
  try {
    //TODO it must come from the auth service

    const { createdUser } = req.body;
    const tickets = await ticketModel.find({ createdUser });
    res.status(200).json({
      status: "success",
      data: tickets,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
  console.log("get user tickets done");
};

//agent solve ticket
exports.solveTicket = async (req, res) => {
  try {
    const { ticketId, status, solution } = req.body;
    const ticket = await ticketModel.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        status: "fail",
        message: "Ticket not found",
      });
    }
    if (status == "closed") {
      ticket.status = status;
      ticket.timeSolved = Date.now();
    }
    ticket.ticketSolution.push(solution);

    await ticket.save();

    // now agent is free we need to assign him a ticket
    if (unassignedTickets.length > 0) {
      const ticketId = unassignedTickets.pop();
      const newTicket = await ticketModel.findById(ticketId);
      const agentId = await assignTicket(newTicket.issue_type);
      if (agentId == -1) {
        unassignedTickets.push(newTicket);
      } else {
        newTicket.agentId = agentId;
      }
      await newTicket.save();
    }
    res.status(200).json({
      status: "success",
      data: ticket,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// rate ticket solution
exports.rateTicketSolution = async (req, res) => {
  try {
    const { ticketId, rating } = req.body;
    const ticket = await ticketModel.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        status: "fail",
        message: "Ticket not found",
      });
    }
    if (ticket.status != "closed") {
      return res.status(404).json({
        status: "fail",
        message: "Ticket not solved yet",
      });
    }
    ticket.rating = rating;
    await ticket.save();

    res.status(200).json({
      status: "success",
      data: ticket,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
  console.log("rate ticket solution done");
};
