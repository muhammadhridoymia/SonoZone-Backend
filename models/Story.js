const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    category: String, // VERY IMPORTANT
    tags: [String],
    audio: {
      english: {
        url: String,
        length: Number,
      },
      bangla: {
        url: String,
        length: Number,
      },
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },

    storyText: {
      english: {
        type: String,
      },
      bangla: {
        type: String,
        required: true,
      },
    },

    imageUrl: {
      type: String,
    },

    writer: {
      name: String,
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

module.exports = mongoose.model("Story", storySchema);
