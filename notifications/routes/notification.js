const express = require('express');
const router = express.Router();

const {
	getAllnotifications,
	sendSignupEmail,
	sendPinEmail,
} = require('../controller/notification');
const { verifyToken } = require('../utils/auth');

// const {
//   verifyToken,
//   verifyRole,
//   testVerifyRole,
//   testVerifyToken,
// } = require("../middleware/auth");
router.use(verifyToken);
router.get('/', getAllnotifications);
router.post('/sendSignupEmail', sendSignupEmail);
router.post('/sendPinEmail', sendPinEmail);

module.exports = router;
