const Story = require("../models/Story");

// Update top status for a story
exports.updateStoryTopStatus = async (req, res) => {
  try {
    const { storyId } = req.params;
    const { period } = req.body;

    // Validate period
    const validPeriods = ['allTime', 'year', 'month', 'week'];
    if (!validPeriods.includes(period)) {
      return res.status(400).json({
        success: false,
        message: "Invalid period. Allowed periods: allTime, year, month, week"
      });
    }

    // Find the story first
    const story = await Story.findById(storyId);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found"
      });
    }

    // Toggle the specific period's value
    const currentValue = story.isTop[period];
    const updatedValue = !currentValue;

    // Update only the specific period
    story.isTop[period] = updatedValue;
    
    // Save the story
    await story.save();

    // Return updated story data
    res.json({
      success: true,
      message: `Top status for ${period} ${updatedValue ? 'enabled' : 'disabled'} successfully`,
    });

  } catch (error) {
    console.error("Error updating top status:", error);
    res.status(500).json({
      success: false,
      message: "Server Error while updating top status",
      error: error.message
    });
  }
};