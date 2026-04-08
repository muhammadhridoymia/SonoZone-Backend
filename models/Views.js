const mongoose = require("mongoose");

const viewSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  storyId: mongoose.Schema.Types.ObjectId,
});

viewSchema.index({ userId: 1, storyId: 1 }, { unique: true });

module.exports = mongoose.model("View", viewSchema);