const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../controller/user');
// const {
//   verifyToken,
//   verifyRole,
//   testVerifyRole,
//   testVerifyToken,
// } = require("../middleware/auth");
// router.use(verifyToken);
router.get('/', getAllUsers);
module.exports = router;
