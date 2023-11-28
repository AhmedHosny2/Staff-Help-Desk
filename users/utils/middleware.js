let x = 0;

const mid = async (req, res, next) => {
	try {
		await fetch('http://localhost:5005/middleware/token', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include', // 'Credentials' should be 'credentials'
		})
			.then((response) => {
				// console.log(response);
				if (response.ok) {
					x = 1;
				} else {
					console.error('Error:', response.statusText);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});

		if (x === 1) {
			return next();
		} else {
			res.status(401).send('Unauthorized');
		}
	} catch (error) {
		console.error('Error:', error);
		res.status(500).send('Internal Server Error');
	}
};

module.exports = mid;
