const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	const authCookie = req.cookies.authcookie;

	if (!authCookie) {
		return res.status(403).json({
			status: 'fail',
			message: 'Unauthorized: Missing token',
		});
	}

	try {
		// Verify the token
		const decodedToken = jwt.verify(authCookie, process.env.JWT_SECRET);
		req.user = decodedToken; // Attach the user data to the request object
		next();
	} catch (error) {
		return res.status(401).json({
			status: 'fail',
			message: 'Unauthorized: Invalid token',
		});
	}
};

module.exports = { verifyToken };
