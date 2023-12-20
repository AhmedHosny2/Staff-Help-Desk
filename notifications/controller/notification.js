const notificationModel = require('../model/notification');
const sendEmail = require('../services/sendEmail');

exports.getAllnotifications = async (req, res) => {
	try {
		const notifications = await notificationModel.find();
		res.status(200).json({
			status: 'success',
			data: notifications,
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err.message,
		});
	}
};

exports.sendSignupEmail = async (req, res) => {
	const { email } = req.body;

	try {
		// Send Email
		const recipient = email;
		const subject = 'Signup Email';
		const text = 'signup';

		sendEmail(recipient, subject, text);

		res.status(200).json({
			status: 'success',
		});
	} catch (err) {
		res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}
};

exports.sendResetPasswordEmail = async (req, res) => {
	const { email, resetLink } = req.body;

	try {
		// Send Email
		const recipient = email;
		const subject = 'Reset password';
		const text = 'reset password';

		sendEmail(recipient, subject, text, resetLink);

		res.status(200).json({
			status: 'success',
		});
	} catch (err) {
		res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}
};

exports.sendTicketUpdateEmail = async (req, res) => {
	const { email, data } = req.body;

	try {
		// Send Email
		const recipient = email;
		const subject = 'Ticket Update';
		const text = 'ticket update';

		sendEmail(recipient, subject, text, '', data);

		res.status(200).json({
			status: 'success',
		});
	} catch (err) {
		res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}
};
