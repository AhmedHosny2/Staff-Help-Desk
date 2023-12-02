const express = require("express");
const router = express.Router();

const { getAllKnowledgeBase } = require("../controller/KnowledgeBase");

const {
  removeFaq,
  modifyFaq,
  createFaq,
} = require("../controller/add-remove-modify");
const { verifyToken ,verifyAdminRole,verifyAgentRole,verifyManagerRole } = require("../utils/auth");
router.use(verifyToken);
// router.use(verifyAgentRole);
// router.use(verifyAdminRole);
// router.use(verifyManagerRole);
router.get("/", getAllKnowledgeBase);
router.delete("/:id", removeFaq);
router.patch("/:id", modifyFaq);
router.post("/", createFaq);

module.exports = router;
