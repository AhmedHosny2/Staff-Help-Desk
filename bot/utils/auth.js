const getCookie = require("./cookies").getEntriesFromCookie;

module.exports.verifyToken = (req, res, next) => {
  const cookie = getCookie(req);
  if (!cookie)
    return res.status(403).send("A token is required for authentication");
  const { id } = cookie;
  console.log("token verfied");
  if (!id) {
    return res.status(403).send("A token is required for authentication");
  }
  return next();
};
