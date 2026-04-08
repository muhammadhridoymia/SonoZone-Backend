// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String,  // For Google login
  avatar: String,
  phone: String,     // Optional for phone login later
}, { timestamps: true });

module.exports = mongoose.model("ShonoUser", userSchema);