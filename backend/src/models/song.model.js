const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    jamendoId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    artistName: {
        type: String,
        required: true,
        trim: true
    },
    albumName: {
        type: String,
        required: true
    },
    albumImage:{
        type: String,
        required: true
    },
    audioUrl: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        default: 0
    },
    mood: {
        type: String,
        enum: ["happy", "angry", "sad", "surprised", "neutral"],
        required: true,
        index: true
    }
}, {timestamps: true});

const songModel = mongoose.model("songs", songSchema);

module.exports = songModel;