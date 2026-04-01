const Story = require("../models/Story");

// Get list of stories (lightweight)
exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find({ isPublished: true })
      .select("_id title imageUrl audio.bangla.length stats writer.name" ) // select only needed fields
      .sort({ createdAt: -1 }) // newest first

    // Map to your format
    const storyList = stories.map(story => ({
      _id: story._id,
      title: story.title,
      imageUrl: story.imageUrl,
      duration: story.audio?.bangla?.length || 0,
      status: story.stats,
      writer: story.writer?.name || "Unknown",
    }));

    res.json({ success: true, data: storyList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};