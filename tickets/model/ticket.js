const mongoose = require("mongoose");
const { Schema } = mongoose;

const ticketSchema = new Schema(
  {
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the User collection assuming the User collection contains agent information
    },

    createdUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the User collection assuming the User collection contains user information
    },

    // may be enum of choices
    issue_type: {
      type: String,
      enum: ["Software", "Hardware", "Network"],
      default: null,
    },

    // may be enum of choices
    sub_category: {
      type: String,
      enum: [
        "desktops", //hardware
        "laptops", //hardware
        "printers", //hardware
        "servers", //hardware
        "networking equipment", //hardware
        "operating system", //software
        "application software", //software
        "custom software", //software
        "integration issues", //software
        "email issues", //network
        "internet connection problems", //network
        "website errors", //network
      ],
      default: null,
    },

    // Details about the ticket
    description: String,
    title: String,
    // Status of the ticket (e.g., open, closed)
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },

    // Rating given to the agent by the user
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    // Time when the ticket was created
    timeCreated: {
      type: Date,
      default: Date.now,
    },

    // Time when the ticket was solved
    timeSolved: Date,

    // Priority of the ticket (e.g., low, medium, high)
    ticketPriority: {
      type: String,
      enum: ["low", "medium", "high"],
    },

    // Solution provided for the ticket
    ticketSolution: Array,
  },
  {
    strict: true,
  }
);
module.exports = mongoose.model("ticket", ticketSchema);
