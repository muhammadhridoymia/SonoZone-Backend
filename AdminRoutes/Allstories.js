const express = require("express");
const router = express.Router();
const { AdminGetAllStories } = require("../AdminControllers/Allstories");
const { updateStoryTopStatus } = require("../AdminControllers/UpdateTops");

router.get("/all/for/admin", AdminGetAllStories);
router.put("/top/status/:storyId", updateStoryTopStatus);

module.exports = router;
