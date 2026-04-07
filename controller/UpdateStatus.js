const Story = require("../models/Story");

// Update story status
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params; 
    const { type } = req.body;  //type can be "likes", "comments", "views"

    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({ success: false, message: "Story not found" });
    }

    story.status = ;
    await story.save();

    res.json({ success: true, message: "Story status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { updateStatus };