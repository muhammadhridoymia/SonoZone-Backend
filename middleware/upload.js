const dotenv = require("dotenv");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");

dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage
});

module.exports = {
  upload,
  cloudinary
};