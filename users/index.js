const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const db = require('./config/database.js');
const userRouter = require('./routes/user.js');
const brandInfoRouter = require('./routes/brandInfo.js');



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
//session
app.use(cookieParser()); // Add cookie parser middleware

// Routes
app.use('/user', userRouter);

app.use('/brandInfo',brandInfoRouter); //brandInfo
app.get("/", (req, res) => {
	res.send("Health Check");
  });
// Handle unspecified routes
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'fail',
		message: 'Specified route not found',
	});
});

const PORT = process.env.PORT || 5001;

db.once('open', () => {
	app.listen(PORT, () => console.log(`User Management Microservice is listening on port ${PORT}`));
});

db.on('error', (err) => {
	console.error('MongoDB error:', err);
});
