const express = require('express');
const router = express.Router();
const { limiter } = require('../utils/rateLimiter');
const { verifyToken, verfiyRole } = require('../utils/middleware');
const {
	getAllUsers,
	getUsersProfile,
	getUserProfile,
	getUserProfileById,
	updateUserProfile,
	addProfilePic,
	deleteProfilePic,
	signupUser,
	loginUser,
	logout,
	updateUserRole,
	updateAgentStatus,
	deleteUser,
	sendResetToken,
	confirmResetToken,
	getAllAgents,
	getMyData,
	updateUtilization,
	adminAddUser,
	searchUsers,
	getUserDataForChat,
} = require('../controller/user');

const { enableMfa, disableMfa, validateMfa, verifyMfa } = require('../controller/2fa');

const { getCustomWorkflow, editCustomWorkflow } = require('../controller/agent');

// --------Public Routes-----------------------
router.post('/signup', signupUser);
router.post('/login', limiter, loginUser);
router.get('/logout', logout);
router.post('/resetPassword', sendResetToken);
router.post('/validateMfa', validateMfa);

router.post('/confirmResetToken/:token', confirmResetToken);

// --------Private Routes----------------------
router.use(verifyToken); // verify User token
// router.get('getBrandInfo', getBrandInfo);
// router.post('updateBrandInfo', updateBrandInfo);
router.get('/getMyData/:id', getMyData);
router.get('/profile', getUserProfile);
router.get('/profile/:userId', getUserProfileById);
router.put('/profile', updateUserProfile);
router.post('/profile/addProfilePic', addProfilePic);


router.put('/profile/deleteProfilePic', deleteProfilePic);
router.post('/enableMfa', enableMfa);
router.post('/disableMfa', disableMfa);
router.post('/verifyMfa', verifyMfa);
router.use(verfiyRole); // verify User role
router.post('/searchUsers', searchUsers);
router.get('/agents', getAllAgents);
router.get('/getCustomWorkflow', getCustomWorkflow);
router.put('/editCustomWorkflow', editCustomWorkflow);
router.put('/utilization', updateUtilization);
router.put('/updateAgentStatus', updateAgentStatus);
router.put('/updateRole', updateUserRole);
router.post('/adminAddUser', adminAddUser);
router.get('/getUserDataForChat', getUserDataForChat);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);
router.post('/getUsersProfile', getUsersProfile);
router.put('/:id', updateUserProfile);

module.exports = router; 
