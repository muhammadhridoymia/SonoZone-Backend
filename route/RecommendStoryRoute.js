const express = require("express");
const router = express.Router();
const {getRecommendedStories} =require ("../controller/recommendStory")

router.get("/recommend/:id", getRecommendedStories);
module.exports = router;
