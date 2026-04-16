const jwt = require("jsonwebtoken");
const Story = require("../models/Story");
const Like = require("../models/Likes");
const Comment = require("../models/Comments");
const View = require("../models/Views");

const updateStatus = async (req, res) => {
  try {
    const { storyId } = req.params;
    const { type, commentText } = req.body;
    const userId = req.user.userId;
    console.log("User ID:", userId);

    if (!storyId || !type) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (!["likes", "comments", "views"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid type",
      });
    }

    // LIKE 
    if (type === "likes") {
      const existingLike = await Like.findOne({ userId, storyId });

      if (existingLike) {
        await Like.deleteOne({ _id: existingLike._id });

        await Story.findByIdAndUpdate(storyId, {
          $inc: { "stats.likes": -1 },
        });

        return res.json({
          success: true,
          message: "Unliked",
        });
      }

      await Like.create({ userId, storyId });

      await Story.findByIdAndUpdate(storyId, {
        $inc: { "stats.likes": 1 },
      });

      return res.json({
        success: true,
        message: "Liked",
      });
    }

    // COMMENT
    if (type === "comments") {
      if (!commentText || commentText.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Comment required",
        });
      }

      await Comment.create({
        userId,
        storyId,
        text: commentText,
      });

      await Story.findByIdAndUpdate(storyId, {
        $inc: { "stats.comments": 1 },
      });

      return res.json({
        success: true,
        message: "Comment added",
      });
    }

    // VIEW
    if (type === "views") {
      const existingView = await View.findOne({ userId, storyId });

      if (!existingView) {
        await View.create({ userId, storyId });

        await Story.findByIdAndUpdate(storyId, {
          $inc: { "stats.views": 1 },
        });
      }

      return res.json({
        success: true,
        message: "View counted",
      });
    }

  } catch (error) {
    console.error("Error updating story status:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { updateStatus };