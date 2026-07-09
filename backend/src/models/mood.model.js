const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", 
        required: true
    },
    emotion: {
        type: String,
        enum: ["happy", "angry", "sad", "surprised", 'neutral'],
        required: true
    },
    songId: {
        type: String,
        default: null
    },
    songName: {
        type: String,
        default: null
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

moodSchema.index({userId: 1, timestamp: -1});

const moodModel = mongoose.model("moods", moodSchema);

module.exports = moodModel;