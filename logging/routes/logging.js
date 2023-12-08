const express = require("express");
const router = express.Router();

const { getLogs, getAdvancedLogs, logError } = require("../controller/logging");
const { verifyToken, verfiyRole } = require("../utils/middleware");

router.post("/log", logError);
router.use(verifyToken);
router.use(verfiyRole);
router.get("/", getLogs);
router.get("/advanced", getAdvancedLogs);
module.exports = router;
