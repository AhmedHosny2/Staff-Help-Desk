const mongoose = require("mongoose");
const { Schema } = mongoose;

const logSchema = new Schema(
  {
    time: {
      type: Date,
      default: Date.now,
    },

    statuscode: {
      type: String,
      required: true,
    },

    method: {
      type: String,
      required: true,
    },

    api: {
      type: String,
      required: true,
    },

    details: {
      type: String,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    strict: true,
  }
);

const Log = mongoose.model("log", logSchema);

module.exports = Log;
