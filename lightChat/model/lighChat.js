const mongoose = require("mongoose");
const { Schema } = mongoose;

const lighChat = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    message: {
      type: Array,
      required: true,
    },
  },
  {
    strict: true,
  }
);

module.exports = mongoose.model("lighChat", lighChat);
