const express = require("express");
const router = express.Router();

const { getAllKnowledgeBase

} = require("../controller/KnowledgeBase");

const { removeFaq,modifyFaq,createFaq

} = require("../controller/add-remove-modify");

router.get("/", getAllKnowledgeBase);
router.delete("/:id", removeFaq);
router.patch("/:id", modifyFaq);
router.post("/", createFaq);

module.exports = router;
