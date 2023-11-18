const express = require("express");
const router = express.Router();

const { getAlltickets

} = require("../controller/ticket");
// const {
//   verifyToken,
//   verifyRole,
//   testVerifyRole,
//   testVerifyToken,
// } = require("../middleware/auth");
// router.use(verifyToken);
router.get("/", getAlltickets);
module.exports = router;
