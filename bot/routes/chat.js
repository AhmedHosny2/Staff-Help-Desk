const express = require("express");
const router = express.Router();

const { 
getAllchats} = require("../controller/chat");
// const {
//   verifyToken,
//   verifyRole,
//   testVerifyRole,
//   testVerifyToken,
// } = require("../middleware/auth");
// router.use(verifyToken);
router.get("/", getAllchats);
module.exports = router;
