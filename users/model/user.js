const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},

		lastName: {
			type: String,
			required: true,
		},

		phoneNumber: String,

		address: String,

		role: {
			type: String,
			enum: ['user', 'admin', 'manager', 'agent1', 'agent2', 'agent3'],
			required: true,
		},

		email: {
			type: String,
			required: true,
			unique: true,
		},

		hash: {
			type: String,
			required: true,
		},

		salt: {
			type: String,
			required: true,
		},

		// PIN for Multi-Factor Authentication (MFA)
		pin: {
			type: String,
		},
		tempPin: {
			type: String,
		  }
	},
	{
		strict: true,
	}
);

const brandInfoSchema = new Schema(
	{
		color: {
			type: String,
			required: true,
		},

		logo: {
			type: String,
			required: true,
		},

		slogan: {
			type: String,
			required: true,
		},

		name: {
			type: String,
			required: true,
		},

		font: {
			type: String,
			required: true,
		},
	},
	{
		strict: true,
	}
);

// // Define the models
const userModel = mongoose.model('user', userSchema);
const brandInfoModel = mongoose.model('brandInfo', brandInfoSchema);

// // Export the models
module.exports = {
	userModel,
	brandInfoModel,
};
