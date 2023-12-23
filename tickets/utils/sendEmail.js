const sendTicketUpdateEmail = async (req, res) => {
	console.log('HERE THIS TIME', req.body);
	try {
		const emailResponse = await fetch(
			'http://localhost:5003/notification/sendTicketUpdateEmail',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(req.body),
			}
		);

		if (emailResponse.ok) {
			return;
		} else {
			console.error('Error:', emailResponse.statusText);
			res.status(500).send('Internal Server Error');
		}
	} catch (error) {
		console.error('Error:', error);
		res.status(500).send('Internal Server Error');
	}
};

module.exports = { sendTicketUpdateEmail };
