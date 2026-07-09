const express = require("express");
const seedController = require("../controllers/seed.controller");

const seedRouter = express.Router();

seedRouter.post("/save", seedController.seedSongs);

module.exports = seedRouter;