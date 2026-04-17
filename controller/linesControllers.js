const Line = require("../models/Lines");
const { cloudinary } = require("../middleware/upload");

// 🔹 Upload helper
const uploadToCloudinary = (file, folder, resource_type = "image") => {
  if (!file) return Promise.resolve("");

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    stream.end(file.buffer);
  });
};

// 🔹 Controller
exports.createLine = async (req, res) => {
  try {
    const {
      title,
      category,
      tags = [],
      isPublished = true,
    } = req.body;

    // Basic validation
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    // 🔹 Parse tags
    let parsedTags = [];

    if (typeof tags === "string") {
      try {
        parsedTags = JSON.parse(tags);
      } catch {
        parsedTags = [tags];
      }
    } else if (Array.isArray(tags)) {
      parsedTags = tags;
    }

    // 🔹 Files
    const imageFile = req.files?.image?.[0];
    const audioFile = req.files?.audio?.[0];

    // 🔹 Upload in parallel
    const [imageUrl, audioUrl] = await Promise.all([
      uploadToCloudinary(imageFile, "lines/images", "image"),
      uploadToCloudinary(audioFile, "lines/audios", "video"),
    ]);

    // 🔹 Create line
    const newLine = new Line({
      title: title.trim(),
      category,
      tags: parsedTags,
      imageUrl,
      audio: audioUrl,
      isPublished: isPublished === "false" ? false : true,
    });

    await newLine.save();
    console.log("Line created:", newLine);

    return res.status(201).json({
      success: true,
      message: "Line created successfully",
      data: newLine,
    });

  } catch (error) {
    console.error("Line Create Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};