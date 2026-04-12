const Story = require("../models/Story");
const Likes =require('../models/Likes')

const getStoryAudio = async (req, res) => {
  try {
    const { id } = req.params;

    const story = await Story.findById(id)
      .select("audio title imageUrl writer.name");

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    let isLiked = false;

    if (req.user) {
      const existingLike = await Likes.findOne({
        userId: req.user.id,
        storyId: id,
      });

      isLiked = !!existingLike;
    }

    const storyData = {
      audio: story.audio,
      title: story.title,
      imageUrl: story.imageUrl,
      writer: story.writer?.name || "Unknown",
      isLiked, // clean
    };

    console.log("audio data is : " ,storyData)
    return res.json({
      success: true,
      data: storyData,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports ={getStoryAudio}