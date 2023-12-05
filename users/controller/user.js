const domain = process.env.DOMAIN;
const secret = process.env.ACCESS_TOKEN_SECRET;
const mfasecret = process.env.ACCESS_TOKEN_SECRET + '2FA';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const sendSignupEmail = require('../utils/sendEmail').sendSignupEmail;
const sendResetPasswordEmail = require('../utils/sendEmail').sendResetPasswordEmail;
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
	if (req.userRole === 'user') {
		return res.status(404).json({
			status: 'unauthorized',
		});
	}

	try {
		const users = await userModel.find();

		return res.status(200).json({
			status: 'success',
			data: users,
		});
	} catch (err) {
		return res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}
};

// GET ONE USER BY ID
exports.getUserProfile = async (req, res) => {
	const id = req.userId;

	try {
		const user = await userModel.findById(id);
		if (!user) {
			return res.status(404).json({
				status: 'fail',
				message: 'User not found',
			});
		}
		return res.status(200).json({
			status: 'success',
			data: user,
		});
	} catch (err) {
		return res.status(500).json({
			status: 'error',
			message: err.message,
		});
	}
};

exports.getMyData = async (req, res) => {
	const { id } = req.params;
	if (id != req.userId)
		return res.status(403).json({
			status: 'fail',
			message: 'Unauthorized',
		});
	// Check if the user ID is valid using the custom function
	if (!isValidUserId(id)) {
		return res.status(404).json({
			status: 'fail',
			message: 'User not found',
		});
	}

	try {
		const user = await userModel.findById(id);
		if (!user) {
			return res.status(404).json({
				status: 'fail',
				message: 'User not found',
			});
		}
		return res.status(200).json({
			status: 'success',
			data: user,
		});
	} catch (err) {
		return res.status(500).json({
			status: 'error',
			message: err.message,
		});
	}
};
// UPDATE USER PROFILE
exports.updateUserProfile = async (req, res) => {
	const id = req.userId;

	try {
		const existingUser = await userModel.findById(id);

		if (!existingUser) {
			return res.status(404).json({
				status: 'fail',
				message: 'User not found',
			});
		}

		// Extract updated data from the request body
		const { firstName, lastName, phoneNumber, address, email, password, ...otherData } = req.body;

		// Check if the email you want to change TO is already in use
		existingEmail = await userModel.findOne({ email, _id: { $ne: id } });

		if (existingEmail) {
			return res.status(400).json({
				status: 'fail',
				message: 'Email is already in use',
			});
		}

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

		return res.status(200).json({
			status: 'success',
			data: existingUser,
		});
	} catch (err) {
		return res.status(500).json({
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
		await sendSignupEmail(req, res);
		// Create a new user if the email is not in use
		const newUser = await userModel.create(newUserData);

		return res.status(201).json({
			status: 'success',
			data: newUser,
		});
	} catch (err) {
		return res.status(500).json({
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

		/*
		if 2fa enabled check -> 
		*/
		var token;
		if (user.pin) {
			token = jwt.sign({ id: user._id, email: user.email }, mfasecret, {
				expiresIn: '1h', // Set your preferred expiration time
			});
		} else {
			token = jwt.sign({ id: user._id, email: user.email }, secret, {
				expiresIn: '1h', // Set your preferred expiration time
			});
		}

		// Set the token as a cookie (optional)
		res.cookie('authcookie', token, {
			httpOnly: true,
			// secure: true,
			sameSite: 'none',
			expires: new Date(Date.now() + 10 * 60 * 60 * 1000), // Expires in 1 hour
			domain,
			path: '/',
		});

		// User is authenticated, create a JWT token
		// Send a success response with the token

		if (!user.pin) {
			console.log('user logged in');
			return res.status(200).json({
				status: 'success',
				message: 'Login successful',
			});
		} else {
			res.writeHead(301, {
				Location: 'http://' + req.headers['host'] + '/2fa',
			}); // not tested yet
			return res.end();
		}
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
	if (req.userRole !== 'admin') {
		return res.status(404).json({
			status: 'unauthorized',
		});
	}

	const id = req.body.userId;

	// Check if the user ID is valid using the custom function
	if (!isValidUserId(id)) {
		return res.status(404).json({
			status: 'fail',
			message: 'User not found',
		});
	}

	try {
		// Fetch the existing user by ID
		const existingUser = await userModel.findById(id);

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

		return res.status(200).json({
			status: 'success',
			data: existingUser,
		});
	} catch (err) {
		return res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}
};

// CHANGE A USERS STATUS ['BUSY', 'FREE']
exports.updateAgentStatus = async (req, res) => {
	// We check if req.userRole is any of the below 3 roles
	const allowedAgentRoles = ['agent1', 'agent2', 'agent3'];
	if (!allowedAgentRoles.includes(req.userRole)) {
		return res.status(404).json({
			status: 'unauthorized',
		});
	}
	const id = req.userId;

	// Check if the user ID is valid using the custom function
	if (!isValidUserId(id)) {
		return res.status(404).json({
			status: 'fail',
			message: 'User not found',
		});
	}

	try {
		// Fetch the existing user by ID
		const existingUser = await userModel.findById(id);

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

		return res.status(200).json({
			status: 'success',
			data: existingUser,
		});
	} catch (err) {
		return res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}
};

// DELETE A USER (REMOVE THIS ROUTE) ORR (REMOVE ALL USER DATA FROM DB => delete account feature)
exports.deleteUser = async (req, res) => {
	const userId = req.body.id;

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
		return res.status(500).json({
			status: 'error',
			message: err.message,
		});
	}
};

/// Reset password logic has 2 endpoints, one for sending the token and other is for verifying it.
exports.sendResetToken = async (req, res) => {
	const { email } = req.body;
	const payload = {
		email: email,
	};
	const options = {
		expiresIn: '1 hour',
	};

	try {
		const token = jwt.sign(payload, secret, options);
		// Should be configured resetPasswordTemplate.sendResetPassword(email,token)
		console.log(token);
		// to be done
		// check if email exists on our db or not

		// Example usage of sendEmail function .. not tested
		const user = await userModel.findOne({ email: email });

		// const recipient = email;
		// const emailSubject = 'Reset password.';
		// const emailText = `Click on the link below to reset your password <br>  <a href="${process.env.CLIENT_URL}/token=${token}">Reset your password now</a> `;
		// // Using await to ensure the email is sent before moving on
		// if (user) await sendEmail(recipient, emailSubject, emailText);
		link = `${process.env.CLIENT_URL}/token=${token}`;
		req.resetLink = link;
		await sendResetPasswordEmail(req, res);

		return res
			.status(200)
			.send('A reset password link will be sent to this email if it exists on our website!');
	} catch (error) {
		res.status(400).send('Enter a vaild email!');
	}
};

exports.confirmResetToken = async (req, res) => {
	const secretKey = config.secretKey;
	const { token } = req.params;
	const password = req.body.password;
	if (!token) return res.status(400).send('Please send a vaild token');
	if (!password) return res.status(400).send("Password can't be empty!");
	try {
		const decoded = jwt.verify(token, secretKey);
		const user = await db('se_project.users')
			.where({ email: decoded.email })
			.update({ password: password });
	} catch (error) {
		return res.status(400).send('Please send a vaild token');
	}
	return res.status(200).send('Password reset successfully!');
};

// GET ALL AGENTS
exports.getAllAgents = async (req, res) => {
	console.log('get all agents');
	try {
		const agents = await userModel.find({
			role: { $in: ['agent1', 'agent2', 'agent3'] },
		});
		//sort on first name
		agents.sort((a, b) => {
			if (a.firstName < b.firstName) return -1;
			if (a.firstName > b.firstName) return 1;
			return 0;
		});

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

// increase agent utilization level by 1
exports.updateUtilization = async (req, res) => {
	const { id, sign } = req.body;
	console.log(id + sign);
	try {
		const agent = await userModel.findById(id);
		if (!agent) {
			return res.status(404).json({
				status: 'fail',
				message: 'User not found',
			});
		}
		if (sign === 'decrease') agent.utilization -= 1;
		else agent.utilization += 1;
		await agent.save();
		res.status(200).json({
			status: 'success',
			data: agent,
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: err.message,
		});
	}
};
