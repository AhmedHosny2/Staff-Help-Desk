const express = require('express');
const router = express.Router();

const { getAlltickets, assignTicket } = require('../controller/ticket'); // assignTicket

// const {
//   verifyToken,
//   verifyRole,
//   testVerifyRole,
//   testVerifyToken,
// } = require("../middleware/auth");
// router.use(verifyToken);

router.get('/', getAlltickets);
router.post('/assign', assignTicket);

module.exports = router;
