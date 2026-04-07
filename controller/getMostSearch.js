const Story = require("../models/Story");

// Get list of lines (lightweight)
exports.MostSearchStory = async (req, res) => {
  try {
    const lines = await Story.find({ isPublished: true })
      .select("_id title imageUrl audio.bangla.length stats writer.name" ) // select only needed fields
      .sort({ "stats.views": -1, "stats.likes": -1 }) // Sort by views and likes
        .limit(10) // Limit to top 10

    // Map to your format
    const lineList = lines.map(line => ({
      _id: line._id,
      title: line.title,
      imageUrl: line.imageUrl,
      duration: line.audio?.bangla?.length || 0,
      status: line.stats,
      writer: line.writer?.name || "Unknown", 
    }));

    res.json({ success: true, data: lineList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
