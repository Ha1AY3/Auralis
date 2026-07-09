import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/mood`,
    withCredentials: true
})

export async function saveMood(emotion, songId = null, songName = null){
    const response = await api.post("/", {
        emotion, songId, songName
    })

    return response.data;
}

export async function getMoods(){
    const response = await api.get("/");

    return response.data;
}

export async function getMoodStats(){
    const response = await api.get("/stats");

    return response.data;
}