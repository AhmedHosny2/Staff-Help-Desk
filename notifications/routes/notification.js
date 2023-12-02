const express = require('express');
const router = express.Router();

const {
	getAllnotifications,
	sendSignupEmail,
	sendPinEmail,
} = require('../controller/notification');
const {
	verifyToken,
	verifyAdminRole,
	verifyAgentRole,
	verifyManagerRole,
} = require('../utils/auth');

router.post('/sendSignupEmail', sendSignupEmail);

router.use(verifyToken);
// router.use(verifyAgentRole);
// router.use(verifyAdminRole);
// router.use(verifyManagerRole);
router.get('/', getAllnotifications);
router.post('/sendPinEmail', sendPinEmail);

module.exports = router;
