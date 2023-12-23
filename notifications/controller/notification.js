const notificationModel = require('../model/notification');
const sendEmail = require('../services/sendEmail');
const { logError } = require('../utils/logging');

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
		logError(req, "500", "POST", "/notification/sendSignupEmail", err.message);
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
		logError(req, "500", "POST", "/notification/sendResetPasswordEmail", err.message);
		res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}
};

exports.sendTicketUpdateEmail = async (req, res) => {
	const { email, ticketId, title, issue, category, description, solution, date, status } =
		req.body;

	const data = {
		ticketId,
		title,
		issue,
		category,
		description,
		solution,
		date,
		status,
	};
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
		logError(req, "500", "POST", "/notification/sendTicketUpdateEmail", err.message);
		res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}
};
