const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const sendEmail = require('../services/sendEmail');
const { userModel, brandInfoModel } = require('../model/user');

// Function to hash a users inputted plain text password
// returns the hash and its salt
function hashPassword(password) {
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
	return { hash, salt };
}

// Function to check the inputted plain text password with the hashed password
// using the salt
// returns true or false if passwords match, respectively.
function verifyPassword(password, hash, salt) {
	const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
	return verifyHash === hash;
}

// to check if the provided userId is valid -> (correct data type and correct length)
// Because when the user id is invalid it raise an error and
// it does not look pretty.
function isValidUserId(userId) {
	return mongoose.Types.ObjectId.isValid(userId) && userId.length === 24;
}

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
	try {
		const users = await userModel.find();

		// Example usage of sendEmail function
		const recipient = 'deskmateNoReply@gmail.com';
		const emailSubject = 'Custom Subject.';
		const emailText = 'This is the content of the email.';

		// Using await to ensure the email is sent before moving on
		await sendEmail(recipient, emailSubject, emailText);

		res.status(200).json({
			status: 'success',
			data: users,
		});
	} catch (err) {
		res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}

	// console.log(process.env.DESKMATE_SENDGRID_API_KEY);
};

// GET ONE USER BY ID
exports.getUserProfile = async (req, res) => {
	const userId = req.params.id;

	// Check if the user ID is valid using the custom function
	if (!isValidUserId(userId)) {
		return res.status(404).json({
			status: 'fail',
			message: 'User not found',
		});
	}

	try {
		const user = await userModel.findById(userId);
		if (!user) {
			return res.status(404).json({
				status: 'fail',
				message: 'User not found',
			});
		}
		res.status(200).json({
			status: 'success',
			data: user,
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: err.message,
		});
	}
};

// UPDATE USER PROFILE
exports.updateUserProfile = async (req, res) => {
	const userId = req.params.id;

	// Check if the user ID is valid using the custom function
	if (!isValidUserId(userId)) {
		return res.status(404).json({
			status: 'fail',
			message: 'User not found',
		});
	}

	try {
		const existingUser = await userModel.findById(userId);

		if (!existingUser) {
			return res.status(404).json({
				status: 'fail',
				message: 'User not found',
			});
		}

		// Extract updated data from the request body
		const { firstName, lastName, phoneNumber, address, email, password, ...otherData } = req.body;

		// Update the user's data
		existingUser.firstName = firstName;
		existingUser.lastName = lastName;
		existingUser.phoneNumber = phoneNumber;
		existingUser.address = address;
		existingUser.email = email;

		// Hash and update the password and salt
		const { hash, salt } = hashPassword(password);
		existingUser.hash = hash;
		existingUser.salt = salt;

		// Update other data (if any)
		Object.assign(existingUser, otherData);

		// Save the updated user
		await existingUser.save();

		res.status(200).json({
			status: 'success',
			data: existingUser,
		});
	} catch (err) {
		res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}
};

// SIGNUP A NEW USER (Create a User)
exports.signupUser = async (req, res) => {
	const { email, password, ...userData } = req.body;

	// Check if the email is already in use
	const existingUser = await userModel.findOne({ email });

	if (existingUser) {
		return res.status(400).json({
			status: 'fail',
			message: 'Email is already in use',
		});
	}

	// Hash the password
	const { hash, salt } = hashPassword(password);

	const newUserData = {
		email,
		hash,
		salt,
		...userData,
	};

	if (['agent1', 'agent2', 'agent3'].includes(newUserData.role)) {
		newUserData.status = 'busy';
	}

	try {
		// Create a new user if the email is not in use
		const newUser = await userModel.create(newUserData);

		res.status(201).json({
			status: 'success',
			data: newUser,
		});
	} catch (err) {
		res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}
};

// LOGIN A USER
exports.loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Check if the email exists in the database
		const user = await userModel.findOne({ email });

		if (!user) {
			return res.status(404).json({
				status: 'fail',
				message: 'Email does not exist',
			});
		}

		// Verify the password
		if (!verifyPassword(password, user.hash, user.salt)) {
			return res.status(401).json({
				status: 'fail',
				message: 'Incorrect Password',
			});
		}

		// User is authenticated, create a JWT token
		const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
			expiresIn: '1h', // Set your preferred expiration time
		});

		// Set the token as a cookie (optional)
		res.cookie('authcookie', token, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // Expires in 1 hour
		});

		// Send a success response with the token
		return res.status(200).json({
			status: 'success',
			message: 'Login successful',
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			status: 'error',
			message: 'Internal server error',
		});
	}
};

// CHANGE A USER's ROLE
exports.updateUserRole = async (req, res) => {
	const userId = req.params.id;

	// Check if the user ID is valid using the custom function
	if (!isValidUserId(userId)) {
		return res.status(404).json({
			status: 'fail',
			message: 'User not found',
		});
	}

	try {
		// Fetch the existing user by ID
		const existingUser = await userModel.findById(userId);

		if (!existingUser) {
			return res.status(404).json({
				status: 'fail',
				message: 'User not found',
			});
		}

		// Extract the new role from the request body
		const { role } = req.body;

		// Check if the role is changing from or to an agent
		const isAgentRole = ['agent1', 'agent2', 'agent3'].includes(role);
		const wasAgentRole = ['agent1', 'agent2', 'agent3'].includes(existingUser.role);

		// Update the user's role
		existingUser.role = role;

		// Update status column based on role changes involving agents
		if (isAgentRole && !wasAgentRole) {
			// Changing to an agent role, add status column
			existingUser.status = 'busy'; // Replace with the desired status value
		} else if (!isAgentRole && wasAgentRole) {
			// Changing from an agent role, remove status column
			existingUser.status = undefined;
		}

		// Save the updated user
		await existingUser.save();

		res.status(200).json({
			status: 'success',
			data: existingUser,
		});
	} catch (err) {
		res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}
};

// CHANGE A USERS STATUS ['BUSY', 'FREE']
exports.updateAgentStatus = async (req, res) => {
	const userId = req.params.id;

	// Check if the user ID is valid using the custom function
	if (!isValidUserId(userId)) {
		return res.status(404).json({
			status: 'fail',
			message: 'User not found',
		});
	}

	try {
		// Fetch the existing user by ID
		const existingUser = await userModel.findById(userId);

		if (!existingUser) {
			return res.status(404).json({
				status: 'fail',
				message: 'User not found',
			});
		}

		// Check if the user has a role of agent1, agent2, or agent3
		const isAgentRole = ['agent1', 'agent2', 'agent3'].includes(existingUser.role);

		if (!isAgentRole) {
			return res.status(403).json({
				status: 'fail',
				message: 'User is not an agent to be able to have a status to change!',
			});
		}

		const { status } = req.body;

		if (!status) {
			return res.status(400).json({
				status: 'fail',
				message: 'Status is required in the request body',
			});
		}

		// Update the status of the agent (replace 'newStatus' with the desired status)
		existingUser.status = status;
		await existingUser.save();

		res.status(200).json({
			status: 'success',
			data: existingUser,
		});
	} catch (err) {
		res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}
};

// DELETE A USER (REMOVE THIS ROUTE) ORR (REMOVE ALL USER DATA FROM DB => delete account feature)
exports.deleteUser = async (req, res) => {
	const userId = req.params.id;

	try {
		const user = await userModel.findByIdAndDelete(userId);
		if (user === null) {
			return res.status(404).json({
				status: 'fail',
				message: 'User not found',
			});
		}
		return res.status(204).json(); // 204 makes sure that the response is empty anyways. so we return nothing
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: err.message,
		});
	}
};

// GET ALL AGENTS
exports.getAllAgents = async (req, res) => {
	console.log('get all agents');
	try {
		
		const agents = await userModel.find({ role: { $in: ['agent1', 'agent2', 'agent3'] } });
		console.log(agents);
		res.status(200).json({
			status: 'success',
			data: agents,
		});
	} catch (err) {
		res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}
};