const ticketModel = require("../model/ticket");
const axios = require("axios");
const { USER_BASE_URL } = require("../services/BaseURLs");
let unassignedTickets = [];

async function assignTicket(issue_type) {
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
}
//get agents data
async function getAgentsData() {
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
}
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
    // TODO  the created user id must come from the auth service
    const newTicket = {
      createdUser,
      issue_type,
      sub_category,
      title,
      description,
    };
    const agentId = await assignTicket(issue_type);
    if (agentId == -1) {
      unassignedTickets.push(req.body);
    } else {
      newTicket.agentId = agentId;
    }

    const ticket = await ticketModel.create(newTicket);
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
