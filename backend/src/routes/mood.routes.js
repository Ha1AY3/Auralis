const express = require("express");
const { authUser } = require("../middleware/auth.middleware");
const moodController = require("../controllers/mood.controller");

const moodRouter = express.Router();

moodRouter.post("/", authUser, moodController.saveMoodController);

moodRouter.get("/", authUser, moodController.getMoodController);

moodRouter.get("/stats", authUser, moodController.getMoodStatsController);

module.exports = moodRouter;