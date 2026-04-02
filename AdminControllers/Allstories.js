const Story = require("../models/Story");

// Get list of stories (lightweight)
exports.AdminGetAllStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .select("_id title imageUrl stats writer.name isTop isPublished createdAt" ) // select only needed fields
      .sort({ createdAt: -1 }) // newest first

    // Map to your format
    const storyList = stories.map(story => ({
      _id: story._id,
      title: story.title,
      imageUrl: story.imageUrl,
      status: story.stats,
      writer: story.writer?.name || "Unknown",
      isTop: story.isTop,
      isPublished: story.isPublished,
      createdAt: story.createdAt,
    }));

    res.json({ success: true, data: storyList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};