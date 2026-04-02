const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/upload");
const { createStory } = require("../controller/storyController");
// Get all published stories
const { getAllStories } = require("../controller/getStoryforUsers");
const { getStoryAudio } = require("../controller/GetAudiosForUsers");
const { getStoryText } = require("../controller/GetStoryText");

router.get("/all", getAllStories);
router.get("/audio/:id", getStoryAudio);
router.get("/text/:id", getStoryText);
router.post("/create",upload.fields([{ name: "image", maxCount: 1 },{ name: "audioEn", maxCount: 1 },{ name: "audioBn", maxCount: 1 },]),createStory,);

module.exports = router;
