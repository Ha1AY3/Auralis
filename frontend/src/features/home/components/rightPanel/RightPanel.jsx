import React from 'react'
import { useSong } from '../../hooks/useSong'
import NowPlaying from '../nowPlaying/NowPlaying';
import RecommendedSongs from '../recommendedSongs/RecommendedSongs';
import "../../styles/rightPanel.scss";

const RightPanel = () => {
    const {currentSong, recommendedSongs, loading} = useSong();
  return (
    <div className='right-panel'>
        <NowPlaying currentSong={currentSong} loading={loading}/>
        <RecommendedSongs songs={recommendedSongs} loading={loading}/>
    </div>
  )
}

export default RightPanel
