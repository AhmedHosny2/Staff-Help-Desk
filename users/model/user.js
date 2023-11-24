const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    
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
    enum: ['user', 'admin', 'manager', 'agent1', 'agent2', 'agent3'],
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  hash: {
    type: String,
    required: true,
  },

  salt: {
    type: String,
    required: true,
  },

  // PIN for Multi-Factor Authentication (MFA)
  tempPin: {
    type: String,
  },  pin: {
    type: String,
  },

  },
  {
    strict: true,
  }
);
module.exports = mongoose.model("user", userSchema);
