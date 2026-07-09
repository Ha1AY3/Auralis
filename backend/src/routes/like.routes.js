const express = require("express");
const likeController = require("../controllers/like.controller");
const { authUser } = require("../middleware/auth.middleware");

const likeRouter = express.Router();

likeRouter.post("/:songId", authUser, likeController.likesController);

likeRouter.get("/", authUser, likeController.getLikesController);

likeRouter.delete("/:songId", authUser, likeController.unlikeController);

module.exports = likeRouter;