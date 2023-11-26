const ticketModel = require('../model/ticket');
const axios = require('axios');

exports.getAlltickets = async (req, res) => {
	try {
		const tickets = await ticketModel.find();
		res.status(200).json({
			status: 'success',
			data: tickets,
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
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
		const mlApiResponse = await axios.post('http://localhost:5012/api/assignTicket', {
			priority,
			type,
		});

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
			status: 'success',
			data: {
				// ...ticket,
				predicted_agent: predictedAgent,
			},
		});
	} catch (err) {
		console.error('Error assigning ticket:', err);
		res.status(500).json({
			status: 'fail',
			message: 'Internal Server Error',
		});
	}
};
