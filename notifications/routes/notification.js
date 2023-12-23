const express = require('express');
const router = express.Router();

const {
	getAllnotifications,
	sendSignupEmail,
	sendResetPasswordEmail,
	sendTicketUpdateEmail,
} = require('../controller/notification');
const { verifyToken, verfiyRole } = require('../utils/middleware');

router.post('/sendSignupEmail', sendSignupEmail);
router.post('/sendResetPasswordEmail', sendResetPasswordEmail);
router.post('/sendTicketUpdateEmail', sendTicketUpdateEmail);

router.use(verifyToken);
router.use(verfiyRole);

router.get('/', getAllnotifications);

module.exports = router;
