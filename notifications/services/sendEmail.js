const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.DESKMATE_SENDGRID_API_KEY);
const signupMailTemplate = require('./emailTemplates/signupMail.js');
const resetPassMail = require('./emailTemplates/resetPassMail.js');
async function sendEmail(to, subject, text, resetLink = '', data = null) {
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
	} else if (text === 'reset password') {
		text = 'Click on the link below to reset your password!';
		html = await resetPassMail(text, resetLink);
	} else if (text === 'ticket update') {
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
			 Thank you for choosing Desk Mate. We're pleased to inform you that your ticket regarding the following issue has been solved:
		</p>
		<ul>
			 <li><strong>Issue:</strong> ${data.issue}</li>
			 <li><strong>Category:</strong> ${data.category}</li>
		</ul>
		<p>
			<strong>Description:</strong>
			<br /><br />
			${data.description}
		</p>
		<p>
			<strong>Solution:</strong>
			<br /><br />
			${data.solution}
		</p>
		<br /><br />
		<p>
			 We look forward to being part of your journey towards enhanced productivity.
		</p>
		<br /><br />
  </div>`;

		html = await signupMailTemplate(subject, text);
	}

	const msg = {
		to,
		from: 'deskmatenoreply@gmail.com',
		subject: subject,
		html,
	};

	await sgMail
		.send(msg)
		.then(() => {})
		.catch((error) => {
			console.error(error);
		});
}

module.exports = sendEmail;
