const { rateLimit } = require("express-rate-limit");
// Rate limiter middleware
exports.limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 10000, // Initial limit
  handler: (req, res) => {
    res.status(429).send("Too many requests. Please try again later.");
  },
  onLimitReached: (req, res, options) => {
    options.max += 1;
    options.delayAfter = 1;
  },
});
