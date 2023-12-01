const getEntriesFromCookie = require('../utils/cookies').getEntriesFromCookie;
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
	const { email } = getEntriesFromCookie(req);

	console.log('IN NOTIFICATION');
	console.log(email);

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

exports.sendPinEmail = async (req, res) => {
	const { email } = getEntriesFromCookie(req);
	// const { pin } = req.body;

	try {
		// Send Email
		const recipient = email;
		const subject = 'Pin Verification Email';
		const text = 'pin';
		const pin = '12345';

		sendEmail(recipient, subject, text, pin);

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
