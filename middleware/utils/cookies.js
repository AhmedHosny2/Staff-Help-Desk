const jwt = require("jsonwebtoken");
const secret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
const domain = process.env.DOMAIN;

function getEntriesFromCookie(req) {
  let authCookie = "";
  let refreshToken = "";
  console.log("here \n\n\n\n\n\n");
  if (req.headers.cookie.includes("authcookie")) {
    authCookie = req.headers.cookie.split("authcookie=")[1].split(";")[0];
  }

  if (req.headers.cookie.includes("refreshToken")) {
    refreshToken = req.headers.cookie.split("refreshToken=")[1].split(";")[0];
  }
  if (!authCookie && !refreshToken) {
    return null;
  }

  try {
    // Verify the access tokens
    const decodedAccessToken = jwt.verify(authCookie, secret);

    // If the access token is valid, return its payload
    console.log("Access token payload:", decodedAccessToken);
    return decodedAccessToken;
  } catch (accessError) {
    // Access token has expired or is invalid, let's try to use the refresh token
    try {
      // Verify the refresh token
      const decodedRefreshToken = jwt.verify(refreshToken, refreshSecret);
      const { email, id } = decodedRefreshToken;
      //   const newAccessToken = jwt.sign({ email, id }, secret, {
      //     expiresIn: "2h",
      //   });

      return decodedRefreshToken;
    } catch (refreshError) {
      // Both access and refresh tokens are invalid, handle the error
      console.error("Token verification error:", refreshError);
      return null; // Return null or handle the error as needed
    }
  }
}

exports.getEntriesFromCookie = getEntriesFromCookie;
