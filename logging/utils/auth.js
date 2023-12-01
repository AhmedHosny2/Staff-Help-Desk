const { rateLimit } = require("express-rate-limit");
const getCookie = require("./cookies").getEntriesFromCookie;
const { userModel } = require("../model/user");

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

// Middleware to verify token presence
exports.verifyToken = (req, res, next) => {
  const cookie = getCookie(req);
  if (!cookie || !cookie.id) {
    return res.status(403).send("A token is required for authentication");
  }
  return next();
};

// Middleware to verify agent role
const verifyRole = async (req, res, next, allowedRoles) => {
  const { id } = getCookie(req);
  if (!id)
    return res.status(403).send("A token is required for authentication");

  try {
    const user = await userModel.findById(id);

    if (!user.role || !allowedRoles.some((role) => user.role.includes(role))) {
      return res
        .status(401)
        .send(`Unauthorized ${allowedRoles.join(", ")} Role`);
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

// Middleware to verify agent role
exports.verifyAgentRole = async (req, res, next) => {
  await verifyRole(req, res, next, ["admin", "agent", "manager"]);
};

// Middleware to verify admin role
exports.verifyAdminRole = async (req, res, next) => {
  await verifyRole(req, res, next, ["admin", "manager"]);
};

// Middleware to verify manager role
exports.verifyManagerRole = async (req, res, next) => {
  await verifyRole(req, res, next, ["manager"]);
};
