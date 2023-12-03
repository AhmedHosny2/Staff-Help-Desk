const express = require('express');
const router = express.Router();
const {
	verifyToken,
	limiter,
	verifyAdminRole,
	verifyAgentRole,
	verifyManagerRole,
} = require('../utils/auth');
const {
	getAllUsers,
	getUserProfile,
	updateUserProfile,
	signupUser,
	loginUser,
	updateUserRole,
	updateAgentStatus,
	deleteUser, sendResetToken, getAllAgents,
} = require('../controller/user');

const { enableMfa, disableMfa, validateMfa, verifyMfa

} = require("../controller/2fa");

const {
	getCustomWorkflow,
	editCustomWorkflow,
} = require('../controller/agent');


// --------Public Routes-----------------------
router.post('/signup', signupUser);
router.post('/login', limiter, loginUser);

// --------Private Routes----------------------
router.use(verifyToken); // verify User token
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.delete('/:id', deleteUser);
router.post('/resetPassword', sendResetToken);
router.post('/enableMfa', enableMfa);
router.post('/disableMfa', disableMfa);
router.post('/validateMfa', validateMfa);
router.post('/verifyMfa', verifyMfa);

// Private Routes
router.get('/agents', getAllAgents);
router.post("/resetPassword", sendResetToken);
router.post("/enableMfa", enableMfa);
router.post("/disableMfa", disableMfa);
router.post("/validateMfa", validateMfa);
router.post("/verifyMfa", verifyMfa);
router.get("/getCustomWorkflow", getCustomWorkflow);
router.put("/editCustomWorkflow", editCustomWorkflow);
router.get('/:id', getUserProfile);
router.put('/:id', updateUserProfile);

router.delete('/:id', deleteUser);
// router.use(verifyAgentRole); // authorization for Agent
router.get('/', getAllUsers);
router.put('/updateAgentStatus', updateAgentStatus);

// router.use(verifyManagerRole); //authorization for Manager
router.get('/agents', getAllAgents);

// router.use(verifyAdminRole); //authorization for Admin
router.put('/updateRole', updateUserRole);


module.exports = router;
