const getCookie = require('./cookies').getEntriesFromCookie;

module.exports.verifyToken = (req, res, next) => {
	const authcookie = getCookie(req).id;
	console.log('token verfied');
	console.log('the cookieee ' + getCookie(req));
	if (!authcookie) {
		return res.status(403).send('A token is required for authentication');
	}
	return next();
};
