const express = require("express");
const router = express.Router();
const { limiter } = require("../utils/rateLimiter");
const { verifyToken, verfiyRole } = require("../utils/middleware");
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
  getMyData,
  updateUtilization,
} = require("../controller/user");

const {
  enableMfa,
  disableMfa,
  validateMfa,
  verifyMfa,
} = require("../controller/2fa");

const {
  getCustomWorkflow,
  editCustomWorkflow,
} = require("../controller/agent");

// --------Public Routes-----------------------
router.post("/signup", signupUser);
router.post("/login", limiter, loginUser);

// --------Private Routes----------------------
router.use(verifyToken); // verify User token
router.get("/getMyData/:id", getMyData);
router.use(verfiyRole); // verify User role
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
router.delete("/:id", deleteUser);
router.post("/resetPassword", sendResetToken);
router.post("/enableMfa", enableMfa);
router.post("/disableMfa", disableMfa);
router.post("/validateMfa", validateMfa);
router.post("/verifyMfa", verifyMfa);

// Private Routes
router.get("/agents", getAllAgents);
router.post("/resetPassword", sendResetToken);
router.post("/enableMfa", enableMfa);
router.post("/disableMfa", disableMfa);
router.post("/validateMfa", validateMfa);
router.post("/verifyMfa", verifyMfa);
router.get("/getCustomWorkflow", getCustomWorkflow);
router.get("/editCustomWorkflow", editCustomWorkflow);
router.get("/:id", getUserProfile);
router.put("/utilization", updateUtilization);
router.put("/:id", updateUserProfile);

router.delete("/:id", deleteUser);
// router.use(verifyAgentRole); // authorization for Agent
router.get("/", getAllUsers);
router.put("/updateAgentStatus", updateAgentStatus);

// router.use(verifyManagerRole); //authorization for Manager
router.get("/agents", getAllAgents);

// router.use(verifyAdminRole); //authorization for Admin
router.put("/updateRole", updateUserRole);

module.exports = router;
