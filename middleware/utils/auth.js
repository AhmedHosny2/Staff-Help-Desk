const express = require("express");
const router = express.Router();
const getCookie = require("./cookies").getEntriesFromCookie;
router.get(
  "/middleware/token",
  (verifyToken = async (req, res, next) => {
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
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});


router.get("/middleware/token", (req, res, next) => {
  const authcookie = getCookie(req);
  console.log("token verfied");
  console.log("the cookieee " + getCookie(req));
  if (!authcookie) {
    return res.status(403).send("A token is required for authentication");
  }
  return next();
});

module.exports = router;
