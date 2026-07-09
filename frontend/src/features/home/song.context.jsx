import { createContext, useEffect, useState } from "react";
import { getSongsByMood } from "./services/songs.api";
import { getLikes, like, unlike } from "./services/like.api";

export const SongContext = createContext();

export const SongProvider = ({children}) => {
    const [currentEmotion, setCurrentEmotion ] = useState('neutral');
    const [ songs, setSongs ] = useState([]);
    const [ currentSong, setCurrentSong ] = useState(null);
    const [ recommendedSongs, setRecommendedSongs ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [likes, setLikes] = useState([]);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() =>{
        if(currentEmotion){
            fetchSongsByMood(currentEmotion);
        }
    },[currentEmotion]);

    useEffect(() => {
        loadLikes();
    }, []);

    useEffect(() => {
        if(currentSong){
            const isFavorite = likes.some(l => l.jamendoId === currentSong.jamendoId);
            setIsLiked(isFavorite);
        }
    }, [currentSong, likes]);

    async function fetchSongsByMood(emotion){
        setLoading(true);

        try{
            const fetchedSongs = await getSongsByMood(emotion);

            if(fetchedSongs.length > 0){
                setSongs(fetchedSongs);
                setCurrentSong(fetchedSongs[0]);
                setRecommendedSongs(fetchedSongs.slice(1, 5));
            }else{
                setSongs([]);
                setCurrentSong(null);
                setRecommendedSongs([]);
            }

        }catch(err){
            throw err;
        }finally{
            setLoading(false);
        }
    }

    async function loadLikes(){
        try{
            const data = await getLikes();
            setLikes(data.songs || []);
            return data;
        }catch(err){
            throw err;
        }
    }

    async function handleLike(songId){
        try{

            const isSongLiked = likes.some(s => s.jamendoId === songId);
            if(isSongLiked){
                await unlike(songId);
                setIsLiked(false);
                setLikes(prev => prev.filter(s => s.jamendoId !== songId));

                if (currentSong && currentSong.jamendoId === songId) {
                    setIsLiked(false);
                }
            }else{
                await like(songId);
                const song = songs.find(s => s.jamendoId === songId);
                if(song){
                    setLikes(prev => [...prev, song]);
                }

                if (currentSong && currentSong.jamendoId === songId) {
                    setIsLiked(true);
                }
            }
        }catch(err){
            throw err;
        }
    }

    async function updateEmotion(emotion){
        setCurrentEmotion(emotion);
    }

    async function playSong(song){
        setCurrentSong(song);
    }

    return(
        <SongContext.Provider value={{currentEmotion, songs, currentSong, recommendedSongs, loading, fetchSongsByMood, updateEmotion, playSong, loadLikes, handleLike, likes, isLiked}}>
            {children}
        </SongContext.Provider>
    )

}