import React, { useEffect, useRef, useState } from 'react'
import "../../styles/nowPlaying.scss"
import { useSong } from '../../hooks/useSong';

const NowPlaying = ({currentSong, loading}) => {
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    const {handleLike, isLiked} = useSong();

    useEffect(() => {
        if(currentSong && audioRef.current){
            setProgress(0);
            setPlaying(false);
            audioRef.current.currentTime = 0;
            audioRef.current.load();
        }
    }, [currentSong]);

    const formatDuration = (seconds) => {
        if (!seconds) return '00:00'
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }

    const togglePlay = () => {
        if(audioRef.current){
            if(playing){
                audioRef.current.pause();
            }else{
                audioRef.current.play();
            }
        }
        setPlaying(!playing);
    }

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const prog = (audioRef.current.currentTime / audioRef.current.duration) * 100
            setProgress(prog || 0)
        }
    }

    const handleProgressClick = (e) => {
        if (!audioRef.current) return
        
        const rect = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const totalWidth = rect.width
        const percentage = Math.min(100, Math.max(0, (clickX / totalWidth) * 100))
        
        const newTime = (percentage / 100) * audioRef.current.duration
        audioRef.current.currentTime = newTime
        setProgress(percentage)
    }

    function handleLikeClick(){
        if(currentSong){
            handleLike(currentSong.jamendoId);
        }
    }

    if (loading) {
        return (
            <div className='now-playing'>
                <div className='loading-state'>Loading song...</div>
            </div>
        )
    }

    if (!currentSong) {
        return (
            <div className='now-playing'>
                <div className='no-song'>No song playing</div>
            </div>
        )
    }


  return (
    <div className='now-playing'>
        <div className='now-playing-header'>
            <h3>Now Playing</h3>
        </div>

        <div className='album-art'>
            <img src={currentSong.albumImage} alt={currentSong.name} />
        </div>

        <div className='song-info'>
            <div className='song-details'>
                <h4>{currentSong.name}</h4>
                <p>{currentSong.artistName}</p>
            </div>
            <button className="heart-btn" onClick={handleLikeClick}>{isLiked ? '❤️' : '🤍'}</button>
        </div>

        <audio ref={audioRef} src={currentSong.audioUrl} onTimeUpdate={handleTimeUpdate} onEnded={() => {
            setPlaying(false);
        }}/>

        <div className='progress-section'>
            <div className='progress-bar' onClick={handleProgressClick}>
                <div className='progress-fill' style={{ width: `${progress}%` }} />
            </div>
            <div className='time-labels'>
                <span>{formatDuration((progress / 100) * (currentSong.duration || 225))}</span>
                <span>{formatDuration(currentSong.duration)}</span>
            </div>
        </div>

        <div className='controls'>
            <button className='control-btn' onClick={() => {
                if(audioRef.current){
                    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
                }
            }}>⏮</button>
            <button className='play-btn' onClick={togglePlay}>
                {playing ? '⏸' : '▶'}
            </button>
            <button className='control-btn' onClick={() => {
                if(audioRef.current){
                    audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10);
                }
            }}>⏭</button>
        </div>
        
    </div>
  )
}

export default NowPlaying
