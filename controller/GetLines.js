const Lines = require("../models/Lines");

// Get list of lines (lightweight)
exports.getLines = async (req, res) => {
  try {
    const lines = await Lines.find({ isPublished: true })
      .select("_id title imageUrl audio stats" ) // select only needed fields
      .sort({ createdAt: -1 }) // newest first

    // Map to your format
    const lineList = lines.map(line => ({
      _id: line._id,
      title: line.title,
      imageUrl: line.imageUrl,
      status: line.stats,
      audio: line.audio || "",  
    }));

    res.json({ success: true, data: lineList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
