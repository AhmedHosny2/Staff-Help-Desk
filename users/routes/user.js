const express = require("express");
const router = express.Router();
// const authMiddleware = require('../../middleware/auth'); // Import authentication middleware

const {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  signupUser,
  loginUser,
  updateUserRole,
  updateAgentStatus,
  deleteUser,
  getAllAgents,
} = require("../controller/user");

// const {
//   verifyToken,
//   verifyRole,
//   testVerifyRole,
//   testVerifyToken,
// } = require("../middleware/auth");
// router.use(verifyToken);

// Public Routes
router.post("/signup", signupUser);
router.post("/login", loginUser);

// Middleware to verify tokens for private routes
// router.use(authMiddleware.verifyToken);

// Private Routes
router.get("/agents", getAllAgents);
router.get("/", getAllUsers);
router.get("/:id", getUserProfile);
router.put("/:id", updateUserProfile);
router.put("/:id/updateRole", updateUserRole);
router.put("/:id/updateAgentStatus", updateAgentStatus);
router.delete("/:id", deleteUser);

module.exports = router;
