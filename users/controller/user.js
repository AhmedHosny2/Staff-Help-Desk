const crypto = require('crypto');
const jwt = require('jsonwebtoken');
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

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
	try {
		const users = await userModel.find();
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
};

// GET ONE USER BY ID
exports.getUserById = async (req, res) => {
	const userId = req.params.id;

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

// Signup new user (Create User)
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

	try {
		// Create a new user if the email is not in use
		const newUser = await userModel.create({
			email,
			hash,
			salt,
			...userData,
		});

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

// Login the user
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

// DELETE A USER
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
