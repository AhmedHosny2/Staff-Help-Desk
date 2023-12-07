const express = require("express");
const router = express.Router();
const { rateLimit } = require("express-rate-limit");
const getCookie = require("./cookies").getEntriesFromCookie;
const passport = require("passport");

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "User has successfully authenticated",
      user: req.user,
    });
  } else {
    res.status(403).json({
      error: true,
      message: "User authenticate failed",
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "User failed to authenticate.",
  });
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

// router.post("/google-signin", googleSignIn);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3, // Initial limit
  handler: (req, res) => {
    res.status(429).send("Too many requests. Please try again later.");
  },
  onLimitReached: (req, res, options) => {
    // This function is called when the initial limit is reached
    options.max += 1; // Subsequent wrong login attempts will face a longer delay
    options.delayAfter = 1; //the delay will be applied starting from the first exceeded attempt
  },
});

router.get("/middleware/token", limiter, (req, res, next) => {
  const authcookie = getCookie(req);
  console.log("token verfied");
  console.log("the cookieee " + getCookie(req));
  if (!authcookie) {
    return res.status(403).send("A token is required for authentication");
  }
  return next();
});

module.exports = router;
