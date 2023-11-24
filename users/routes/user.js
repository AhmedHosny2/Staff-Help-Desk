const express = require("express");
const router = express.Router();

const {getAllUsers,sendResetToken

} = require("../controller/user");
const { enableMfa,disableMfa,validateMfa,verifyMfa

} = require("../controller/2fa");
// const {
//   verifyToken,
//   verifyRole,
//   testVerifyRole,
//   testVerifyToken,
// } = require("../middleware/auth");
// router.use(verifyToken);
router.get("/", getAllUsers);
router.post("/resetPassword", sendResetToken);
router.post("/enableMfa", enableMfa);
router.post("/disableMfa", disableMfa);
router.post("/validateMfa", validateMfa);
router.post("/verifyMfa", verifyMfa);
module.exports = router;
