require("dotenv").config();
module.exports = {
  USER_BASE_URL: process.env.USER_BASE_URL,
  MIDDLEWARE_BASE_URL:process.env.MIDDLEWARE_BASE_URL,
  LOGGING_BASE_URL: process.env.LOGGING_BASE_URL,
  NOTIFICATION_BASE_URL: process.env.NOTIFICATION_BASE_URL,
};
