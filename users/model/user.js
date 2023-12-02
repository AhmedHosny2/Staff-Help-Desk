const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  phoneNumber: String,

  address: String,

  role: {
    type: String,
    enum: ["user", "admin", "manager", "agent1", "agent2", "agent3"],
    required: true,
  },
  utilization: {
    Software: {
      type: Number,
      required: false,
    },
    Hardware: {
      type: Number,
      required: false,
    },
    Network: {
      type: Number,
      required: false,
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  status: {
    type: String,
    required: false,
  },

  hash: {
    type: String,
    required: true,
  },

  salt: {
    type: String,
    required: true,
  },

  custom_workflow: {
    type: Array,
    default: null,
  },
  // PIN for Multi-Factor Authentication (MFA)
  pin: {
    type: String,
  },
  tempPin: {
    type: String,
  },
});

const brandInfoSchema = new Schema(
  {
    color: {
      type: String,
      required: true,
    },

    logo: {
      type: String,
      required: true,
    },

    slogan: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    font: {
      type: String,
      required: true,
    },
  },
  {
    strict: true,
  }

);

// // Define the models
const userModel = mongoose.model("user", userSchema);
const brandInfoModel = mongoose.model("brandInfo", brandInfoSchema);

// // Export the models
module.exports = {
  userModel,
  brandInfoModel,
};
