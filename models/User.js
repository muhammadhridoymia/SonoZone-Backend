// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  phone: String,
  password: String,

  isVerified: {type: Boolean,default: false},
  verificationToken: String,

  googleId: String,  // For Google login
  
}, { timestamps: true });

module.exports = mongoose.model("ShonoUser", userSchema);