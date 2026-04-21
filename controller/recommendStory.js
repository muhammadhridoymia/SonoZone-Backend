const Story = require("../models/Story");

const getRecommendedStories = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Get current story
    const currentStory = await Story.findById(id);

    if (!currentStory) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Step 2: Find similar stories
    const recommendations = await Story.find({
      _id: { $ne: id }, // exclude current story
      category: currentStory.category,
      isPublished: true,
    })
      .select("_id title imageUrl audio stats writer.name")
      .sort({ "stats.likes": -1, "stats.views": -1 }) // popular first
      .limit(5);

    const getDuration = (audio) => {
      if (audio?.bangla?.length > 0) return audio.bangla.length;
      if (audio?.english?.length > 0) return audio.english.length;
      if (audio?.arabic?.length > 0) return audio.arabic.length;
      return 0;
    };

    const storyList = recommendations.map((story) => ({
      _id: story._id,
      title: story.title,
      imageUrl: story.imageUrl,
      // if bangla audio length is not available, fallback to english or arabic audio length
      duration:getDuration(story.audio),
      status: story.stats,
      writer: story.writer?.name || "Unknown",
    }));

    res.json({ success: true, data: storyList });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getRecommendedStories };
