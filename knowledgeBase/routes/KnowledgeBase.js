const express = require("express");
const router = express.Router();

const { getAllKnowledgeBase, postKnowledgeBase

} = require("../controller/KnowledgeBase");

router.get("/getAll", getAllKnowledgeBase);
router.post("/add", postKnowledgeBase);

module.exports = router;


