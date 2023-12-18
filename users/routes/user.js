const express = require('express');
const router = express.Router();
const { limiter } = require('../utils/rateLimiter');
const { verifyToken, verfiyRole } = require('../utils/middleware');
const {
	getAllUsers,
	getUsersProfile,
	getUserProfile,
	updateUserProfile,
	addProfilePic,
	deleteProfilePic,
	signupUser,
	loginUser,
	updateUserRole,
	updateAgentStatus,
	deleteUser,
	sendResetToken,
	confirmResetToken,
	getAllAgents,
	getMyData,
	updateUtilization,
	adminAddUser,
} = require('../controller/user');

const { enableMfa, disableMfa, validateMfa, verifyMfa } = require('../controller/2fa');

const { getCustomWorkflow, editCustomWorkflow } = require('../controller/agent');

// --------Public Routes-----------------------
router.post('/signup', signupUser);
router.post('/login', limiter, loginUser);
router.post('/resetPassword', sendResetToken);
router.post('/confirmResetToken', confirmResetToken);

// --------Private Routes----------------------
//router.use(verifyToken); // verify User token
router.get('/getMyData/:id', getMyData);
//router.use(verfiyRole); // verify User role

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.post('/profile/addProfilePic', addProfilePic);
router.put('/profile/deleteProfilePic', deleteProfilePic);
router.post('/resetPassword', sendResetToken);
router.post('/enableMfa', enableMfa);
router.post('/disableMfa', disableMfa);
router.post('/validateMfa', validateMfa);
router.post('/verifyMfa', verifyMfa);
router.get('/agents', getAllAgents);
router.get('/getCustomWorkflow', getCustomWorkflow);
router.put('/editCustomWorkflow', editCustomWorkflow);
router.put('/utilization', updateUtilization);
router.put('/updateAgentStatus', updateAgentStatus);
router.put('/updateRole', updateUserRole);
router.post('/adminAddUser', adminAddUser);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);
router.post('/getUsersProfile', getUsersProfile);
router.put('/:id', updateUserProfile);

module.exports = router;
