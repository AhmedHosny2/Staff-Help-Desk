// const {
//   getUserMessages,
//   postUserMessage,
//   updateMessageReadStatus,
//   postRoom
// } = require('../controller/user')
// const authenticateToken = require('../middleware/authenticateToken')
const express = require("express");
const router = express.Router();

const {
  test,
  getUserContacts,
  getUserMessages,
  postRoom,
  postUserMessage,
  updateMessageReadStatus,
} = require("../controller/user");
const { verifyToken, verfiyRole } = require("../utils/middleware");

// router.use(authenticateToken)
router.use(verifyToken);
router.use(verfiyRole);
router.get("/", test);
router.get("/getUserContacts", getUserContacts);
router.get("/getUserMessages", getUserMessages);
router.post("/postRoom", postRoom);
router.post("/postUserMessage", postUserMessage);
router.put("/updateMessageReadStatus", updateMessageReadStatus);

// READ
// router.get('/:userId/contacts', getUserContacts)
// router.get('/:userId/messages', getUserMessages)

// // CREATE
// router.post('/:userId/message', postUserMessage)
// router.post('/:userId/room', postRoom)

// // UPDATE
// router.put('/:userId/messages/status', updateMessageReadStatus)

module.exports = router;
