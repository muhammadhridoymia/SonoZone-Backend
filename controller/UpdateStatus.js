const Story = require("../models/Story");
const Like = require("../models/Likes");
const Comment = require("../models/Comments");
const View = require("../models/Views");

const updateStatus = async (req, res) => {
  try {
    const { StoryId } = req.params;
    const { type, UserId, CommentText } = req.body;

    if (!StoryId || !type || !UserId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!["likes", "comments", "views"].includes(type)) {
      return res.status(400).json({ message: "Invalid type" });
    }

    //LIKE 
    if (type === "likes") {
      const existingLike = await Like.findOne({ userId: UserId, storyId: StoryId });

      if (existingLike) {
        await Like.deleteOne({ _id: existingLike._id });

        await Story.findByIdAndUpdate(StoryId, {
          $inc: { "stats.likes": -1 },
        });

        return res.json({ message: "Unliked" });
      }

      await Like.create({ userId: UserId, storyId: StoryId });

      await Story.findByIdAndUpdate(StoryId, {
        $inc: { "stats.likes": 1 },
      });

      return res.json({ message: "Liked" });
    }

    //COMMENT
    if (type === "comments") {
      if (!CommentText || CommentText.trim() === "") {
        return res.status(400).json({ message: "Comment required" });
      }

      await Comment.create({
        userId: UserId,
        storyId: StoryId,
        text: CommentText,
      });

      await Story.findByIdAndUpdate(StoryId, {
        $inc: { "stats.comments": 1 },
      });

      return res.json({ message: "Comment added" });
    }

    //VIEW
    if (type === "views") {
      const existingView = await View.findOne({ userId: UserId, storyId: StoryId });

      if (!existingView) {
        await View.create({ userId: UserId, storyId: StoryId });

        await Story.findByIdAndUpdate(StoryId, {
          $inc: { "stats.views": 1 },
        });
      }

      return res.json({ message: "View counted" });
    }

  } catch (error) {
    console.error("Error updating story status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { updateStatus };