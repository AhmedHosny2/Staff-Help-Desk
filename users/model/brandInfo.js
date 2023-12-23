const mongoose = require("mongoose");

const brandInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slogan: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const brandInfoModel = mongoose.model("brandInfo", brandInfoSchema);

module.exports = { brandInfoModel };
