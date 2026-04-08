const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  storyId: mongoose.Schema.Types.ObjectId,
});

likeSchema.index({ userId: 1, storyId: 1 }, { unique: true });

module.exports = mongoose.model("Like", likeSchema);