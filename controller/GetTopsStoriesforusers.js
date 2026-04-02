const Story = require("../models/Story");

// Get top stories based on time period
exports.getTopStories = async (req, res) => {
  try {
    const { period } = req.params; // allTime, year, month, week
    const limit = 10

    // Validate period
    const validPeriods = ['allTime', 'year', 'month', 'week'];
    if (!validPeriods.includes(period)) {
      return res.status(400).json({
        success: false,
        message: "Invalid period. Allowed periods: allTime, year, month, week"
      });
    }

    // Build query for top stories
    const query = {
      isPublished: true,
      [`isTop.${period}`]: true
    };

    // Fetch top stories based on period
    let topStories = await Story.find(query)
      .select("_id title imageUrl audio.bangla.length stats writer.name" ) // select only needed fields
      .sort({ "stats.views": -1, "stats.likes": -1 }) // Sort by views and likes
      .limit(parseInt(limit));

    // Map to frontend-friendly format
    const storyList = topStories.map(story => ({
      _id: story._id,
      title: story.title,
      imageUrl: story.imageUrl,
      duration: story.audio?.bangla?.length || 0,
      status: story.stats,
      writer: story.writer?.name || "Unknown",
    }));

    // Add rank to each story
    const rankedStories = storyList.map((story, index) => ({
      ...story,
      rank: index + 1
    }));

    res.json({
      success: true,
      data: rankedStories,
    });

  } catch (error) {
    console.error("Error fetching top stories:", error);
    res.status(500).json({
      success: false,
      message: "Server Error while fetching top stories",
      error: error.message
    });
  }
};