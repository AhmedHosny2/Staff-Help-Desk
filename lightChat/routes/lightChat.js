const express = require("express");
const router = express.Router();

const { getAllChats } = require("../controller/lightChat");
const { verifyToken, verfiyRole } = require("../utils/middleware");
router.use(verifyToken);
router.use(verfiyRole);

router.get("/", getAllChats);
module.exports = router;
