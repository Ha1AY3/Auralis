const axios = require("axios");

const JAMENDO_CLIENT_ID = process.env.JAMENDO_CLIENT_ID;
const BASE_URL = 'https://api.jamendo.com/v3.0';

const getTracksByMood = async(mood, limit = 20) => {
    const moodToTags = {
         happy: ['pop', 'rock', 'dance'],
        angry: ['rock', 'metal', 'punk'],
        sad: ['acoustic', 'piano', 'ambient'],
        surprised: ['electronic', 'experimental'],
        neutral: ['ambient', 'jazz', 'instrumental']
    };

    const tags = moodToTags[mood] || ["chill"];
    let allSongs = [];
    const usedIds = new Set();

    for(const tag of tags){
        if(allSongs.length >= limit){
            break;
        }

        console.log(`🔍 Trying tag: ${tag}`);

        const response = await axios.get(`${BASE_URL}/tracks/`, {
            params: {
                client_id: JAMENDO_CLIENT_ID,
                tags: tag,
                limit: limit,
                audioformat: "mp32",
                format: "json"
            }
        });

        const results =  response.data.results || [];

        for(const song of results){
            if(!usedIds.has(song.id)  && allSongs.length < limit){
                allSongs.push(song);
                usedIds.add(song.id)
            }
        }
    }

    return allSongs;
}

module.exports = {getTracksByMood};