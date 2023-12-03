const express = require("express");
const router = express.Router();

const {
  getAllnotifications,
  sendSignupEmail,
  sendPinEmail,
} = require("../controller/notification");
const { verifyToken, verfiyRole } = require("../utils/middleware");

router.post("/sendSignupEmail", sendSignupEmail);

router.use(verifyToken);
router.use(verfiyRole);

router.get("/", getAllnotifications);
router.post("/sendPinEmail", sendPinEmail);

module.exports = router;
