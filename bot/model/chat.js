const mongoose = require('mongoose');

const botSchema = new mongoose.Schema({
	// User who created the chat
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	// Message sent by the user
	message: {
		type: String,
		required: true,
	},
	// Response from the bot
	response: {
		type: Array,
		required: true,
	},
	threadId: {
		type: String,
		required: true,
	},
	assistantId: {
		type: String,
		required: true,
	},
});

const Bot = mongoose.model('bot', botSchema);

module.exports = Bot;