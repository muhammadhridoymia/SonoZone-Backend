const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

likeSchema.index({ userId: 1, storyId: 1 }, { unique: true });

module.exports = mongoose.model("Like", likeSchema);