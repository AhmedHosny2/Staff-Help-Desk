const express = require("express");
const router = express.Router();

const { getAllKnowledgeBase

} = require("../controller/KnowledgeBase");

router.get("/", getAllKnowledgeBase);
module.exports = router;
