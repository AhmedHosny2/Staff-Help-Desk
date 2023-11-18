const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Reference to the User collection assuming the User collection contains agent information
  },

  createdUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Reference to the User collection assuming the User collection contains user information
  },

// may be enum of choices 
  category: String,

// may be enum of choices 
issueType: String,

  // Details about the ticket
  details: String,

  // Status of the ticket (e.g., open, in progress, closed)
  status: {
    type: String,
    enum: ['open', 'in_progress', 'closed'],
    default: 'open',
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
    enum: ['low', 'medium', 'high'],
  },

  // Solution provided for the ticket
  ticketSolution: String,
  },
  {
    strict: true,
  }
);
module.exports = mongoose.model("ticket", userSchema);
