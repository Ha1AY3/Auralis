const express = require("express");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const songRouter = require("./routes/song.routes");
const seedRouter = require("./routes/seed.routes");
const likeRouter = require("./routes/like.routes");
const moodRouter = require("./routes/mood.routes");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/songs", songRouter);
app.use("/api/seeds", seedRouter);
app.use("/api/likes", likeRouter);
app.use("/api/mood", moodRouter);


module.exports = app;