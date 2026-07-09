import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/songs`,
    withCredentials: true
});

export async function getSongsByMood(mood){
    const response = await api.get(`/?mood=${mood}`);

    return response.data.songs || [];
}