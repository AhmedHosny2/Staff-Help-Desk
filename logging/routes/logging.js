const express = require("express");
const router = express.Router();

const {getAllLogs

} = require("../controller/logging");

router.get("/", getAllLogs);
module.exports = router;
