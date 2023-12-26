const express = require("express");
const router = express.Router();
const passport = require('passport');

const getCookie = require('./cookies').getEntriesFromCookie;
router.get(
	'/middleware/token',
	(verifyToken = async (req, res, next) => {
		if (!getCookie(req)) {
			console.log('unauthorized');

			return res.status(403).send('A token is required for authentication');
		}

		const { id,email } = getCookie(req);

		// get the user data from the user service by id

		if (!id) {
			return res.status(403).send('A token is required for authentication');
		}

		return res.status(200).json({
			status: 'success',
			data: { id,email },
		});
	})
);
const{authenticateGoogle,googleCallback} = require("../utils/passport.js");
router.get("/google", authenticateGoogle);
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/error', // Redirect on failure
  }), googleCallback);

// router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});
// router.post("/google-signin", googleSignIn);

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 3, // Initial limit
//   handler: (req, res) => {
//     res.status(429).send("Too many requests. Please try again later.");
//   },
//   onLimitReached: (req, res, options) => {
//     // This function is called when the initial limit is reached
//     options.max += 1; // Subsequent wrong login attempts will face a longer delay
//     options.delayAfter = 1; //the delay will be applied starting from the first exceeded attempt
//   },
// });

router.get("/middleware/token",  (req, res, next) => {
  const authcookie = getCookie(req);
  if (!authcookie) {
    return res.status(403).send("A token is required for authentication");
  }
  return next();
});

module.exports = router;
