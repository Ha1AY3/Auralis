const moodModel = require("../models/mood.model");

async function saveMoodController(req, res){
    const userId = req.user.id;
    const {emotion, songId, songName} = req.body;

    if(!emotion){
        return res.status(400).json({
            message: "Emotion is required"
        })
    }

    const mood = await moodModel.create({
        userId,
        emotion,
        songId : songId || null,
        songName: songName || null
    })

    res.status(201).json({
        message: "Mood added successfully",
        mood
    })
}

async function getMoodController(req, res){
    const userId = req.user.id;

    const moods = await moodModel.find({userId}).sort({timestamp: -1});

    if(moods.length === 0){
        return res.status(404).json({
            message: "Mood not found"
        })
    }

    res.status(200).json({
        message: "Moods fetched successfully",
        moods
    })


}

async function getMoodStatsController(req, res){
    const userId = req.user.id;

    const moods = await moodModel.find({userId});
    if(moods.length === 0){
        return res.status(404).json({
            message: "Mood not found"
        })
    }

    const stats = {
        happy: 0,
        angry: 0,
        sad: 0,
        surprised: 0,
        neutral: 0,
        total: moods.length
    }

    moods.forEach(mood => {
        if(stats[mood.emotion] !== undefined){
            stats[mood.emotion]++;
        }
    });

    const percentage = {};
    for(const [key, value] of Object.entries(stats)){
        if(key != 'total'){
            percentage[key] = Math.round((value / stats.total) * 100);
        }
    }

    res.status(200).json({
        message: "Mood statistics fetched successfully",
        stats,
        percentage
    })
}

module.exports = {saveMoodController, getMoodController, getMoodStatsController};