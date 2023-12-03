const getCookie = require("./cookies").getEntriesFromCookie;

// Middleware to verify token presence
exports.verifyToken = (req, res, next) => {
  const cookie = (req.body.jwt);
  if (!cookie) {
    return res.status(403).send("A token is required for authentication");
  }
  return next();
};
