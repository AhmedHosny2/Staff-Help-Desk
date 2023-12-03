let x = 0;
const { USER_BASE_URL, MIDDLEWARE_BASE_URL } = require("../services/BaseURLs");

exports.verifyToken = async (req, res, next) => {
  try {
    await fetch(`${MIDDLEWARE_BASE_URL}middleware/token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.cookie,
      },
      credentials: "include", // 'Credentials' should be 'credentials'
    })
      .then((res) => {
        if (res.status !== 403) {
         return res.json();
        }
      })
      .then((data) => {
        if (!data) {
          return;
        }

        x = 1;
        req.userId = data.data.id;
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    if (x === 1) {
      return next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.verfiyRole = async (req, res, next) => {
  try {
    await fetch(`${USER_BASE_URL}/getMyData/${req.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.cookie,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.data && data.data.role) {
          req.userRole = data.data.role;
          req.userEmail = data.data.email;
          console.log("role is " + req.userRole);
          return next();
        } else {
          res.status(401).send("Unauthorized");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};
