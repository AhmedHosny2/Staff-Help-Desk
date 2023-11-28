const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.DESKMATE_SENDGRID_API_KEY);
const signupMailTemplate = require('./emailTemplates/signupMail');

// Create an asynchronous function to send an email
async function sendEmail(to, subject) {
	// console.log(process.env.DESKMATE_SENDGRID_API_KEY);
	// console.log(to, subject, text);
	const msg = {
		to,
		from: 'deskmatenoreply@gmail.com',
		subject,
		html: signupMailTemplate(subject),
	};

	await sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent');
		})
		.catch((error) => {
			console.error(error);
		});
}

// Export the sendEmail function

module.exports = sendEmail;
