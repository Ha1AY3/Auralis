import { useContext } from "react"
import { MoodContext } from "../context/mood.context"


export const useMood = () => {
    const context = useContext(MoodContext);

    return context;
}