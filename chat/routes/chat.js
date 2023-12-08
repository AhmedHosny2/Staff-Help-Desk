const express = require("express");
const router = express.Router();

const { getAllchats } = require("../controller/chat");

const {
  verifyToken,
 verfiyRole
} = require("../utils/middleware");
router.use(verifyToken);
router.use(verfiyRole);
router.get("/", getAllchats);
module.exports = router;
