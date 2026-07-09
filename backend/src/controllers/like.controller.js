const likeModel = require("../models/like.model");
const songModel = require("../models/song.model");

async function likesController(req, res){
    const userId = req.user.id;
    const songId = req.params.songId;

    const isSongExists = await songModel.findOne({
        jamendoId: songId
    });
    if(!isSongExists){
        return res.status(404).json({
            message: "No songs found"
        })
    }

    const isLikeExists = await likeModel.findOne({
        userId, songId
    })
    if(isLikeExists){
        return res.status(400).json({
            message: "Like already exists"
        })
    }

    const like = await likeModel.create({
        userId : userId,
        songId: songId
    })

    res.status(201).json({
        message: "Song likes successfully",
        like
    })
}

async function getLikesController(req, res){
    const userId = req.user.id;

    const likes = await likeModel.find({userId});
    if(likes.length === 0){
        return res.status(404).json({
            message: "No likes found"
        })
    }

    const songIds = likes.map(like => like.songId);
    const songs = await songModel.find({
        jamendoId: {
            $in: songIds
        }
    })

    res.status(200).json({
        message: "Likes fetched successfully",
        songs
    })
}

async function unlikeController(req, res){
    const userId = req.user.id;
    const songId = req.params.songId;

    const like = await likeModel.findOneAndDelete({
        userId, songId
    })
    if(!like){
        return res.status(404).json({
            message: "No like found"
        })
    }

    res.status(200).json({
        message: "Like deleted successfully",
        like
    })
}

module.exports = {likesController, getLikesController, unlikeController};