const express = require("express");
const router = express.Router();

const { getAllChats,sendMessage , getUserChats } = require("../controller/lightChat");
const { verifyToken, verfiyRole } = require("../utils/middleware");
router.use(verifyToken);
router.use(verfiyRole);

// router.get("/", getAllChats);
router.post("/send", sendMessage);
router.get("/", getUserChats);
module.exports = router;
