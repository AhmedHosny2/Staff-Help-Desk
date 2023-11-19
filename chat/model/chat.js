const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
	user1Id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},

	user2Id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},

	// Array of messages in the chat
	messages: [
		{
			user1: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'users',
			},
			user2: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'users',
			},
			time: {
				type: Date,
				default: Date.now,
			},
			content: String,
		},
	],

	// Time when the chat was created
	timeCreated: {
		type: Date,
		default: Date.now,
	},
});

const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;
