const express = require("express");
const router = express.Router();

const { 
getAllnotifications
} = require("../controller/notification");
// const {
//   verifyToken,
//   verifyRole,
//   testVerifyRole,
//   testVerifyToken,
// } = require("../middleware/auth");
// router.use(verifyToken);
router.get("/", getAllnotifications);
module.exports = router;
