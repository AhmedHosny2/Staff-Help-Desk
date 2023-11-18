const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.CONNECTION_URL;


mongoose.set("strictQuery", true);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
module.exports = mongoose.connection;
