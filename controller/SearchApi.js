const Story = require("../models/Story");

const Searchapi = async (req, res) => {
  try {
    const { query } = req.query;
    console.log("Search query:", query);

    if (!query || query.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Query parameter is required" });
    }

    // Search for stories matching the query in title, tags, or category
    const searchResults = await Story.find({
      isPublished: true,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { "writer.name": { $regex: query, $options: "i" } },
      ],
    })
      .select("_id title imageUrl audio.bangla.length stats writer.name")
      .sort({ "stats.likes": -1, "stats.views": -1 }); // sort by popularity

    // Map results to desired format
    const formattedResults = searchResults.map((story) => ({
      _id: story._id,
      title: story.title,
      imageUrl: story.imageUrl,
      duration: story.audio?.bangla?.length || 0,
      status: story.stats,
      writer: story.writer?.name || "Unknown",
    }));

    res.json({ success: true, data: formattedResults });
    console.log("Search results:", formattedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { Searchapi };
