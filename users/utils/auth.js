const { rateLimit } = require('express-rate-limit');
const getCookie = require('./cookies').getEntriesFromCookie;


exports.limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 3, // Initial limit
	handler: (req, res) => {
	  res.status(429).send('Too many requests. Please try again later.');
	},
	onLimitReached: (req, res, options) => {
	  // This function is called when the initial limit is reached
	  options.max += 1;        // Subsequent wrong login attempts will face a longer delay
	  options.delayAfter = 1;  //the delay will be applied starting from the first exceeded attempt
	},
  });

module.exports.verifyToken = (req, res, next) => {

	const cookie  = getCookie(req);
	if(!cookie) return res.status(403).send('A token is required for authentication');
	const {id} = cookie;
	console.log('token verfied');
	if (!id) {
		return res.status(403).send('A token is required for authentication');
	}
	return next();
};
