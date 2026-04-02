const Story = require("../models/Story");

// Get audio URLs 
const getStoryText = async (req, res) => {
  try {
    const { id } = req.params; 

    const story = await Story.findById(id).select("storyText");

    if (!story) {
      return res.status(404).json({ success: false, message: "Story not found" });
    }

    res.json({success: true,data: {text: story.storyText,},});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getStoryText };