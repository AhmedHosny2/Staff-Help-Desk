const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.DESKMATE_SENDGRID_API_KEY);
const signupMailTemplate = require('./emailTemplates/signupMail');

async function sendEmail(to, emailSubject) {
	const pint = 'https://cloudfilesdm.com/postcards/5a14400163a58e597a200db837a9ee39.png';
	html = await signupMailTemplate('test SUBJECT', 'TEST TEXT', pint);
	// html = `<div>test</div>`;

	const msg = {
		to,
		from: 'deskmatenoreply@gmail.com',
		subject: 'email subject itself',
		text: 'test text',
		// templateId: process.env.DESKMATE_POSTCARDS_TEMPLATE_KEY,
		// dynamicTemplateData: {
		// 	subject: 'TEST SUBJECT',
		// 	text: 'THIS IS THE TEST TEXT BODY',
		// },
		html: html,
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
