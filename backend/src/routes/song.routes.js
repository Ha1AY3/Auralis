const express = require("express");
const { getSongsRecommendation } = require("../controllers/song.controller");

const songRouter = express.Router();

songRouter.get("/", getSongsRecommendation);

module.exports = songRouter;