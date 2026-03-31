const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/upload");
const { createStory } = require("../controller/storyController");
// Get all published stories
const { getAllStories } = require("../controller/getStoryforUsers");

router.get("/all", getAllStories);
router.post("/create",upload.fields([{ name: "image", maxCount: 1 },{ name: "audioEn", maxCount: 1 },{ name: "audioBn", maxCount: 1 },]),createStory,);

module.exports = router;
