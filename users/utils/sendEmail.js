const sendSignupEmail = async (req, res) => {
	try {
		const email = req.body;

		const emailResponse = await fetch('http://localhost:5003/notification/sendSignupEmail', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(email),
		});

		if (emailResponse.ok) {
			return;
		} else {
			console.error('Error:', emailResponse.statusText);
			res.status(500).send('Internal Server Error');
		}
	} catch (error) {
		console.error('Error:', error);
		res.status(500).send('Internal Server Error');  // then onw should not update the res object , you can return  -1 
	}
};

module.exports = { sendSignupEmail };
