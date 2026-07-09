const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    songId: {
        type: String,
        required: true
    }
}, {timestamps: true});

likeSchema.index({userId: 1, songId: 1}, {unique: true});

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;