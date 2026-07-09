import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/likes`,
    withCredentials: true
})

export async function like(songId){
    const response = await api.post(`/${songId}`);

    return response.data;
}

export async function getLikes(){
    const response = await api.get("/");

    return response.data;
}

export async function unlike(songId){
    const response = await api.delete(`/${songId}`);

    return response.data;
}