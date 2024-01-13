const express = require("express");
const router = express.Router();
const getCookie = require("./cookies").getEntriesFromCookie;
router.get(
  "/middleware/token",
   (req, res, next) => {
    console.log("lol");
    if (!getCookie(req)) {
      console.log("unauthorized");

      return res.status(403).send("A token is required for authentication");
    }

    const { id, email } = getCookie(req);

    // get the user data from the user service by id

    if (!id) {
      return res.status(403).send("A token is required for authentication");
    }

    return res.status(200).json({
      status: "success",
      data: { id, email },
    });
  })


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});


module.exports = router;
