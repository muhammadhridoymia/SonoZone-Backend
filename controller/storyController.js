const Story = require("../models/Story");
const { cloudinary } = require("../middleware/upload");

// 🔹 File validator
const validateFile = (file, type) => {
  if (!file) return { valid: true };

  const limits = {
    image: 10 * 1024 * 1024, // 10MB
    audio: 30 * 1024 * 1024, // 30MB
  };

  if (type === "image" && !file.mimetype.startsWith("image/")) {
    return { valid: false, message: "Only image files allowed" };
  }

  if (type === "audio" && !file.mimetype.startsWith("audio/")) {
    return { valid: false, message: "Only audio files allowed" };
  }

  if (file.size > limits[type]) {
    return {
      valid: false,
      message: `${type} must be less than ${
        type === "image" ? "10MB" : "30MB"
      }`,
    };
  }

  return { valid: true };
};

// 🔹 Upload helper (stream)
const uploadToCloudinary = (file, folder, resource_type = "image") => {
  if (!file) return Promise.resolve("");

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type },
      (error, result) => {
        if (error) {
          console.error("💥 Cloudinary Error:", error);
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );

    stream.end(file.buffer);
  });
};

// 🔹 Controller
exports.createStory = async (req, res) => {
  try {
    const {
      title,
      category,
      tags = [],
      englishText = "",
      banglaText,
      arabicText = "",
      writerName,
      audioEnLength = 0,
      audioBnLength = 0,
      audioArLength = 0,
      isPublished = true,
    } = req.body;

    //Basic validation
    if (!title || !banglaText || !writerName) {
      return res.status(400).json({
        success: false,
        message: "Title, Bangla text and writer name are required",
      });
    }

    // 🔹 Files
    const imageFile = req.files?.image?.[0];
    const audioEnFile = req.files?.audioEn?.[0];
    const audioBnFile = req.files?.audioBn?.[0];
    const audioArFile = req.files?.audioAr?.[0]; // New Arabic audio file

    // ✅ File validation
    const validations = [
      validateFile(imageFile, "image"),
      validateFile(audioEnFile, "audio"),
      validateFile(audioBnFile, "audio"),
      validateFile(audioArFile, "audio"), // Validate Arabic audio
    ];

    const invalid = validations.find(v => !v.valid);
    if (invalid) {
      return res.status(400).json({ success: false, message: invalid.message });
    }

    // ⚡ Parallel upload (VERY IMPORTANT)
    const [imageUrl, audioEnUrl, audioBnUrl, audioArUrl] = await Promise.all([
      uploadToCloudinary(imageFile, "stories/images", "image"),
      uploadToCloudinary(audioEnFile, "stories/audios", "video"),
      uploadToCloudinary(audioBnFile, "stories/audios", "video"),
      uploadToCloudinary(audioArFile, "stories/audios", "video"), // Upload Arabic audio
    ]);

    // 🔹 Create story
    const newStory = new Story({
      title,
      category,
      tags: Array.isArray(tags) ? tags : [tags],
      storyText: {
        english: englishText,
        bangla: banglaText,
        arabic: arabicText, // You can add Arabic text if needed
      },
      imageUrl,
      audio: {
        english: {
          url: audioEnUrl,
          length: Number(audioEnLength) || 0,
        },
        bangla: {
          url: audioBnUrl,
          length: Number(audioBnLength) || 0,
        },
        arabic: {
          url: audioArUrl,
          length: Number(audioArLength) || 0, // You can add length for Arabic audio if needed
        },
      },
      writer: {
        name: writerName,
      },
      isPublished: isPublished === "false" ? false : true,
    });
    console.log("🚀 New Story Object:", newStory);

    await newStory.save();

    return res.status(201).json({
      success: true,
      message: "Story created successfully",
      data: newStory,
    });

  } catch (error) {
    console.error("💥 Backend Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};