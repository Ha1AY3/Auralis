const  songModel = require( "../models/song.model");
const  {getTracksByMood}  =  require ("../services/jamendo.service");


async function seedSongs(req, res){
    try{
        const moods = ["happy", "angry", "sad", "surprised", "neutral"];
        let total = 0;

        for(const mood of moods){
            const tracks = await getTracksByMood(mood, 20);

            if(tracks.length === 0){
                continue;
            }

            const songs = tracks.map(track => ({
                jamendoId: track.id,
                name: track.name,
                artistName: track.artist_name,
                albumName: track.album_name || track.name,
                albumImage: track.album_image || track.image,
                audioUrl: track.audio,
                duration: track.duration || 0,
                mood: mood
            }));

            await songModel.insertMany(songs);
            total += songs.length;
        }

        res.json({
            success: true,
            message: "Seeded songs"
        })
    }catch(error){
        console.error("Seed error: ", error.message);
    }
}

module.exports = {seedSongs};