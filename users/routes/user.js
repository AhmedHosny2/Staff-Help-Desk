const express = require("express");
const router = express.Router();
const {
  verifyToken,
  limiter,
  verifyAdminRole,
  verifyAgentRole,
  verifyManagerRole,
} = require("../utils/auth");
const {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  signupUser,
  loginUser,
  updateUserRole,
  updateAgentStatus,
  deleteUser,
  sendResetToken,
  getAllAgents,
} = require("../controller/user");

const {
  enableMfa,
  disableMfa,
  validateMfa,
  verifyMfa,
} = require("../controller/2fa");

// Public Routes
router.post("/signup", signupUser);
router.post("/login", limiter, loginUser);

// Middleware to verify tokens for private routes
router.use(verifyToken);
// router.use(verifyAgentRole);
// router.use(verifyAdminRole);
// router.use(verifyManagerRole);

// Private Routes
router.get("/agents", getAllAgents);
router.get("/", getAllUsers);
router.get("/:id", getUserProfile);
router.put("/:id", updateUserProfile);
router.put("/:id/updateRole", updateUserRole);
router.put("/:id/updateAgentStatus", updateAgentStatus);
router.delete("/:id", deleteUser);
router.post("/resetPassword", sendResetToken);
router.post("/enableMfa", enableMfa);
router.post("/disableMfa", disableMfa);
router.post("/validateMfa", validateMfa);
router.post("/verifyMfa", verifyMfa);

module.exports = router;
