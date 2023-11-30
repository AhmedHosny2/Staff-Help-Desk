const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.DESKMATE_SENDGRID_API_KEY);
const signupMailTemplate = require('./emailTemplates/signupMail.js');
const pinEmailTemplate = require('./emailTemplates/pinEmail.js');
const test = require('./emailTemplates/test.js');

const fs = require('fs');
const path = require('path');

const pintPath = path.join(__dirname, 'emailTemplates', 'pint.png');
const pintBase64 = fs.readFileSync(pintPath, { encoding: 'base64' });
const image = './emailTemplates/test.jpeg';

async function sendEmail(to, subject, text, pin = '') {
	let html = '';

	if (text === 'signup') {
		text = `
			<div>
				<p>
					Welcome to Desk Mate, your all-in-one solution for seamless task management and support!
					We're thrilled to have you on board. Our team is dedicated to providing you with the best user experience,
					and we're here to support you every step of the way.
				</p>
				<br /><br />
				<p>
					If you ever need assistance, have questions, or encounter any technical issues, our help center is
					just a click away. Our knowledgeable support team is ready to assist you in making the most out of
					Desk Mate. Feel free to explore our comprehensive features and make your work life more organized and efficient.
				</p>
				<br /><br />
				<p>
					Thank you for choosing Desk Mate. We look forward to being part of your journey towards enhanced productivity.
				</p>
				<br /><br />
			</div>`;

		html = await signupMailTemplate(subject, text);
		// html = await test(image);
	} else if (text === 'pin') {
		text = 'Here is your PIN. Keep it safe!';
		html = await pinEmailTemplate(text, pin);
	}

	const msg = {
		to,
		from: 'deskmatenoreply@gmail.com',
		subject: subject,
		html,
		// text: 'test text',
		// templateId: process.env.DESKMATE_POSTCARDS_TEMPLATE_KEY,
		// dynamicTemplateData: {
		// 	subject: 'TEST SUBJECT',
		// 	text: 'THIS IS THE TEST TEXT BODY',
		// },
	};

	await sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent!!!');
		})
		.catch((error) => {
			console.error(error);
		});
}

// Export the sendEmail function

module.exports = sendEmail;
