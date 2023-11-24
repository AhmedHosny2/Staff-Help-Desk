// make test controoler reutrn all users
const { userModel, brandInfoModel } = require('../model/user');

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

// CREATE A USER
exports.createUser = async (req, res) => {
	try {
		const newUser = await userModel.create(req.body);

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

// DELETE A USER
exports.deleteUser = async (req, res) => {
	const userId = req.params.id;

	try {
		const user = await userModel.findByIdAndDelete(userId);
		if (!user) {
			return res.status(404).json({
				status: 'fail',
				message: 'User not found',
			});
		}
		res.status(204).json(); // No content for successful deletion
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: err.message,
		});
	}
};
