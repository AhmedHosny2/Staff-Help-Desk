const express = require('express');
const router = express.Router();
// const authMiddleware = require('../utils/middleware');
const authMiddleware = require('../utils/auth').verifyToken;


const {
	getAllUsers,
	getUserProfile,
	updateUserProfile,
	signupUser,
	loginUser,
	updateUserRole,
	updateAgentStatus,
	deleteUser,sendResetToken,	getAllAgents, getBrandInfo, updateBrandInfo, createBrandInfo, updateSpecificBrandInfo, deleteBrandInfo,
} = require('../controller/user');

const { enableMfa,disableMfa,validateMfa,verifyMfa

} = require("../controller/2fa");



// const {
//   verifyToken,
//   verifyRole,
//   testVerifyRole,
//   testVerifyToken,
// } = require("../middleware/auth");
// router.use(verifyToken);

// Public Routes
router.post('/signup', signupUser);
router.post('/login', loginUser);

// Middleware to verify tokens for private routes
// router.use(authMiddleware);

// Private Routes
router.get('/agents', getAllAgents);
router.get('/brandInfo',getBrandInfo)  //brandInfo
router.get('/', getAllUsers);
router.get('/:id', getUserProfile);

router.put('/:id', updateUserProfile);
router.put('/:id/updateRole', updateUserRole);
router.put('/:id/updateAgentStatus', updateAgentStatus);
router.put('/brandInfo/:id',updateBrandInfo);  //brandInfo


router.post('/brandInfo',createBrandInfo);  //brandInfo
router.post("/resetPassword", sendResetToken);
router.post("/enableMfa", enableMfa);
router.post("/disableMfa", disableMfa);
router.post("/validateMfa", validateMfa);
router.post("/verifyMfa", verifyMfa);

router.patch('/brandInfo/:id',updateSpecificBrandInfo); //brandInfo

router.delete('/brandInfo/:id', deleteBrandInfo)  //brandInfo
router.delete('/:id', deleteUser);

module.exports = router;
