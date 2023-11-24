const express = require('express');
const router = express.Router();

const {
	getAllUsers,
	getUserById,
	signupUser,
	loginUser,
	deleteUser,
} = require('../controller/user');

// const {
//   verifyToken,
//   verifyRole,
//   testVerifyRole,
//   testVerifyToken,
// } = require("../middleware/auth");
// router.use(verifyToken);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.delete('/:id', deleteUser);

module.exports = router;
