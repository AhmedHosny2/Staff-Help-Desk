const express = require("express");
const router = express.Router();

const { getAllLogs, logError } = require("../controller/logging");
const { verifyToken, verfiyRole } = require("../utils/middleware");
router.use(verifyToken);
router.use(verfiyRole);
router.get("/", getAllLogs);
router.post("/log", logError);
module.exports = router;
