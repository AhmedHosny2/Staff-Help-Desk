const mongoose = require("mongoose");
const { Schema } = mongoose;
const notificationSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the "users" collection
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the "users" collection
    },

    notifContent: String,

    timeCreated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    strict: true,
  }
);
module.exports = mongoose.model("notification", notificationSchema);
