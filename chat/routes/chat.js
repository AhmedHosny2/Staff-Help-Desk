const express = require("express");
const router = express.Router();

const { 
getAllchats} = require("../controller/chat");

const { verifyToken ,verifyAdminRole, verifyAgentRole,verifyManagerRole} = require("../utils/auth");
router.use(verifyToken);
// router.use(verifyAgentRole);
// router.use(verifyAdminRole);
// router.use(verifyManagerRole);
router.get("/", getAllchats);
module.exports = router;
