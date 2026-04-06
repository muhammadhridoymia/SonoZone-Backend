const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {

    category: String, 
    tags: [String],
    audio: String,
    
    title: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
    },

    stats: {
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Line", storySchema);
