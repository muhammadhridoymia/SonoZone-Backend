const express = require("express");
const router = express.Router();
const { createLine } = require("../controller/linesControllers");
const { getLines } = require("../controller/GetLines");

const { upload } = require("../middleware/upload");

router.post("/create",upload.fields([{ name: "image", maxCount: 1 },{ name: "audio", maxCount: 1 },]),createLine,);
router.get("/list", getLines);

module.exports = router;
