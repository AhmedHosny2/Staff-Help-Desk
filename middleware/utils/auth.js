const express = require("express");
const router = express.Router();
const getCookie = require("./cookies").getEntriesFromCookie;
router.get(
  "/middleware/token",
  (verifyToken = async (req, res, next) => {
    const { id } = getCookie(req);

    // get the user data from the user service by id

    if (!id) {
      return res.status(403).send("A token is required for authentication");
    }

    return res.status(200).json({
      status: "success",
      data: { id },
    });
  })
);
module.exports = router;
