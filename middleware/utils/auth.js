const express = require('express');
const router = express.Router();
const getCookie = require('./cookies').getEntriesFromCookie;

router.get(
	'/middleware/token',
	(verifyToken = (req, res, next) => {
		const authcookie = getCookie(req);
		console.log('token verfied');
		console.log('the cookieee ' + getCookie(req));
		if (!authcookie) {
			return res.status(403).send('A token is required for authentication');
		}
		return next();
	})
);
module.exports = router;
