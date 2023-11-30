const express = require('express');
const cookieParser = require('cookie-parser');
// const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(cookieParser());

// Middleware to verify tokens for private routes
// app.use(authMiddleware.verifyToken);

app.listen(PORT, () => {
	console.log(`Authentication Microservice is listening on port ${PORT}`);
});
