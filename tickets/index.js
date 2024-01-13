const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { addRecordsForAllIssueTypes, } = require("./controller/automaticWorkflow.js");
require('dotenv').config();

const db = require('./config/database.js');
addRecordsForAllIssueTypes();
const ticketRouter = require('./routes/ticket.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
//session
app.use(cookieParser()); // Add cookie parser middleware

// Routes
app.use('/ticket', ticketRouter);

const PORT = process.env.PORT || 5001;
app.get("/", (req, res) => {
	res.send("Health Check");
  });
  
db.once('open', () => {
	app.listen(PORT, () =>
		console.log(`Tickets Management Microservice is listening on port ${PORT}`)
	);
});

db.on('error', (err) => {
	console.error('MongoDB error:', err);
});
