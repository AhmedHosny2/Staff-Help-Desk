const express = require("express");
const router = express.Router();

const { getAllKnowledgeBase } = require("../controller/KnowledgeBase");

const {
  removeFaq,
  modifyFaq,
  createFaq,
} = require("../controller/add-remove-modify");
const { verifyToken, verfiyRole } = require("../utils/middleware");
router.use(verifyToken);
router.use(verfiyRole);
router.get("/", getAllKnowledgeBase);
router.delete("/:id", removeFaq);
router.patch("/:id", modifyFaq);
router.post("/", createFaq);

module.exports = router;
