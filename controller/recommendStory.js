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
      isPublished: true
    })
      .select("_id title imageUrl audio.bangla.length stats writer.name" ) 
      .sort({ "stats.likes": -1, "stats.views": -1 }) // popular first
      .limit(5);

    const storyList = recommendations.map(story => ({
      _id: story._id,
      title: story.title,
      imageUrl: story.imageUrl,
      duration: story.audio?.bangla?.length || 0,
      status: story.stats,
      writer: story.writer?.name || "Unknown",
    }));

    res.json({success:true,data:storyList});

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getRecommendedStories };