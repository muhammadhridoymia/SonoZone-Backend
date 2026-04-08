const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  storyId: mongoose.Schema.Types.ObjectId,
  text: String,
});

module.exports = mongoose.model("Comment", commentSchema);