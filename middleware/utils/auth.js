const express = require('express');
const router = express.Router();
const { rateLimit } = require('express-rate-limit');
const getCookie = require('./cookies').getEntriesFromCookie;
const { googleSignIn } = require('./google');

router.post('/google-signin', googleSignIn);


const limiter = rateLimit({
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


router.get(
	'/middleware/token', limiter, (req, res, next) => {
		const authcookie = getCookie(req);
		console.log('token verfied');
		console.log('the cookieee ' + getCookie(req));
		if (!authcookie) {
			return res.status(403).send('A token is required for authentication');
		}
		return next();
	})

module.exports = router;
