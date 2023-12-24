const mongoose = require("mongoose");
const { Schema } = mongoose;

const lighChat = new Schema(
  {
    
  },
  {
    strict: true,
  }
);

module.exports = mongoose.model("lighChat", lighChat);
