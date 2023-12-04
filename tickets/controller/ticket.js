const { ticketModel } = require("../model/ticket");
const axios = require("axios");
const { OpenAI } = require("openai");
const { USER_BASE_URL } = require("../services/BaseURLs");
const { tickets } = require("../utils/botMessage");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const highPriorityTasks = [];
const midPriorityTasks = [];
const lowPriorityTasks = [];

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
const updateUtilization = async (id, sign, cookie) => {
  try {
    await fetch(`${USER_BASE_URL}/utilization`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      Credentials: "include",
      body: JSON.stringify({ id, sign }),
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

const assignTicket = async function (req, issue_type) {
  const agents = await getAgentsData(req);
  let result = -1;
  // high
  const techLead =
    issue_type == "Software" ? 0 : issue_type == "Hardware" ? 1 : 2;

  //mid
  const senior = (techLead + 2) % 3;
  // low
  const junior = (techLead + 1) % 3;
  console.log("issue type " + issue_type);
  console.log("tech lead " + techLead);
  console.log("senior " + senior);
  console.log("junior " + junior);

  if (agents[techLead].utilization < 5) {
    result = agents[techLead].id;
  } else if (agents[senior].utilization < 5) {
    result = agents[senior].id;
  } else if (agents[junior].utilization < 5) {
    result = agents[junior].id;
  }
  if (result != -1) {
    await updateUtilization(result, "increase", req.headers.cookie);
  }
  console.log("assign ticket done\n\n" + result);
  return result; // no agent available
};
//get agents data
const getAgentsData = async function (req) {
  // we will call function that sends the three agents ids and untilization
  let agents = [];
  await fetch(`${USER_BASE_URL}/agents`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: req.headers.cookie,
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
    console.log(req.userId + " " + req.userEmail);
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
    const { issue_type, sub_category, title, description } = req.body;
    const createdUser = req.userId;
    let ticketAssigned = false;
    // TODO  the created user id must come from the auth service
    const newTicket = {
      createdUser,
      issue_type,
      sub_category,
      title,
      description,
    };
    const agentId = await assignTicket(req, issue_type);
    if (agentId != -1) {
      newTicket.agentId = agentId;
      ticketAssigned = true;
      newTicket.status = "pending";
    }
    const ticketIssue = `"category": ${issue_type}   "description":  ${description}}`;
    const ticketPriority = await assignTicketPriority(ticketIssue);
    newTicket.ticketPriority = ticketPriority;

    const ticket = await ticketModel.create(newTicket);
    if (!ticketAssigned) {
      if (ticketPriority == "high") {
        highPriorityTasks.push(ticket._id);
      } else if (ticketPriority == "medium") {
        midPriorityTasks.push(ticket._id);
      } else {
        lowPriorityTasks.push(ticket._id);
      }
    }

    console.log("ticket created");
    console.log(newTicket);
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

    // decrease agent utilization
    await updateUtilization(ticket.agentId, "decrease", req.headers.cookie);
    const newTicketId =
      highPriorityTasks.length > 0
        ? highPriorityTasks.pop()
        : midPriorityTasks.length > 0
        ? midPriorityTasks.pop()
        : lowPriorityTasks.length > 0
        ? lowPriorityTasks.pop()
        : null;
    const newTicket = await ticketModel.findById(newTicketId);
    if (newTicket != null) {
      const agentId = await assignTicket(req, newTicket.issue_type);
      newTicket.agentId = agentId;
      newTicket.status = "pending";
      await newTicket.save();
      await updateUtilization(agentId, "increase", req.headers.cookie);
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
