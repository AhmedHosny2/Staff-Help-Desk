const express = require("express");
const router = express.Router();

const { getAllLogs,
    logError

} = require("../controller/logging");
const { verifyToken } = require("../utils/auth");
router.use(verifyToken);
// router.use(verifyAgentRole);
// router.use(verifyAdminRole);
// router.use(verifyManagerRole);
router.get("/", getAllLogs);
router.post("/log", logError);
module.exports = router;
