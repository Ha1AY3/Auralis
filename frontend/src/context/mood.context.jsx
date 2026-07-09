import { createContext, useEffect, useState } from "react";
import { getMoods, getMoodStats, saveMood } from "../services/mood.api";


export const MoodContext = createContext();

export const MoodProvider = ({children}) => {

    const [moods, setMoods] = useState([]);
    const [moodStats, setMoodStats]= useState(null);
    const [loading, setLoading] =  useState(false);

    useEffect(() => {
        loadMood();
        loadMoodStats();
    }, []);

    async function loadMood(){
        setLoading(true);
        try{
            const data = await getMoods();
            setMoods(data.moods || []);
            return data;
        }catch(err){
            throw err;
        }finally{
            setLoading(false);
        }
    }

    async function loadMoodStats(){
        setLoading(true);
        try{
            const data = await getMoodStats();
            setMoodStats(data);
            return data;
        }catch(err){
            throw err;
        }finally{
            setLoading(false);
        }
    }

    async function addMood(emotion, songId = null, songName = null){
        setLoading(true);
        try{
            const data = await saveMood(emotion, songId, songName);
            await loadMood();
            await loadMoodStats();
        }catch(err){
            throw err;
        }finally{
            setLoading(false);
        }
    }

    return(
        <MoodContext.Provider value={{moods, moodStats, loadMood, loadMoodStats, addMood, loading}}>
            {children}
        </MoodContext.Provider>
    )
}