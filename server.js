require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const storyRoutes = require("./route/storyRoutes");
const adminStoryRoutes = require("./AdminRoutes/Allstories");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

//api
app.get("/", (req, res) => {res.send("API is running...");});

app.use("/api/stories", storyRoutes);


// Admin routes
app.use("/api/admin/stories", adminStoryRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});