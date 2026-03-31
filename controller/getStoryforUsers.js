const Story = require("../models/Story");

// Get all published stories
exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find({ isPublished: true })
      .sort({ createdAt: -1 }); // Sort by newest first
    
    res.status(200).json({
      success: true,
      count: stories.length,
      data: stories
    });
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching stories",
      error: error.message
    });
  }
};