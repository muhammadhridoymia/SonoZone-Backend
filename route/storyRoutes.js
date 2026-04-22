const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/upload");
const { createStory } = require("../controller/storyController");
// Get all published stories
const { getTopStories } = require("../controller/GetTopsStoriesforusers");
const {getStoryAudio} =require ("../controller/GetAudiosForUsers")
const { getStoryText } = require("../controller/GetStoryText");
const { MostSearchStory } = require("../controller/getMostSearch");
const { Searchapi } = require("../controller/SearchApi");
const { updateStatus } = require("../controller/UpdateStatus");
const authMiddleware = require("../middleware/UserMiddleware");
const optionalAuth = require ("../middleware/optionalAuth")



router.put("/update/status/:storyId", authMiddleware, updateStatus);
router.get("/most/searched", MostSearchStory);
router.get("/search", Searchapi);

router.get("/all/tops/:period", getTopStories);
router.get("/audio/:id",optionalAuth,getStoryAudio);
router.get("/text/:id", getStoryText);
router.post("/create",upload.fields([{ name: "image", maxCount: 1 },{ name: "audioEn", maxCount: 1 },{ name: "audioBn", maxCount: 1 },{ name: "audioAr", maxCount: 1 }]),createStory,);

module.exports = router;
