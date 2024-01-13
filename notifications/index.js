const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/database.js');
const notificationRouter = require('./routes/notification.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
//session
app.use(cookieParser()); // Add cookie parser middleware

// Routes
app.use('/notification', notificationRouter);
app.get("/", (req, res) => {
	res.send("Health Check");
  });
const PORT = process.env.PORT || 5001;

db.once('open', () => {
	app.listen(PORT, () =>
		console.log(`Notification Management Microservice is listening on port ${PORT}`)
	);
});

db.on('error', (err) => {
	console.error('MongoDB error:', err);
});
