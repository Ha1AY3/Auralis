const songModel = require("../models/song.model");


async function getSongsRecommendation(req, res){
    const {mood} = req.query;

    if(!mood){
        return res.status(400).json({
            message: "Mood is required"
        })
    }

    const songs = await songModel.find({ mood });

    if(songs.length === 0){
        return res.status(404).json({
            message: "Songs not found"
        })
    }

    const shuffle = songs.sort(() => 0.5 - Math.random());
    const selected = shuffle.slice(0,5);

    res.json({
        mood,
        songs: selected
    })
}

module.exports = {getSongsRecommendation};