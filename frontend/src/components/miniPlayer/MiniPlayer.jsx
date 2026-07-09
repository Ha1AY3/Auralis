import React, { useRef, useState, useEffect } from 'react'
import "../../styles/miniPlayer.scss"
import { useSong } from '../../features/home/hooks/useSong'

const MiniPlayer = ({ song }) => {
    const { handleLike, loadLikes } = useSong()
    
    const [playing, setPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const audioRef = useRef(null)

    useEffect(() => {
        if (song && audioRef.current) {
            setProgress(0)
            setPlaying(false)
            audioRef.current.currentTime = 0
            audioRef.current.load()
        }
    }, [song])

    const formatDuration = (seconds) => {
        if (!seconds) return '00:00'
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }

    const togglePlay = () => {
        if (audioRef.current) {
            if (playing) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
            setPlaying(!playing)
        }
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

    const handleUnlike = async () => {
        if (song) {
            await handleLike(song.jamendoId)
            await loadLikes();
        }
    }

    if (!song) return null

    return (
        <div className='mini-player'>
            <div className='mini-player-album'>
                <img 
                    src={song.albumImage || 'https://via.placeholder.com/60'} 
                    alt={song.name}
                />
            </div>

            <div className='mini-player-info'>
                <h4>{song.name}</h4>
                <p>{song.artistName}</p>
            </div>

            <div className='mini-player-controls'>
                <button onClick={() => {
                    if (audioRef.current) {
                        audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10)
                    }
                }}>⏮</button>
                
                <button className='play-btn' onClick={togglePlay}>
                    {playing ? '⏸' : '▶'}
                </button>
                
                <button onClick={() => {
                    if (audioRef.current) {
                        audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10)
                    }
                }}>⏭</button>
            </div>

            <div className='mini-player-progress'>
                <div className='progress-bar' onClick={handleProgressClick}>
                    <div className='progress-fill' style={{ width: `${progress}%` }} />
                </div>
                <div className='time-labels'>
                    <span>{formatDuration((progress / 100) * (song.duration || 225))}</span>
                    <span>{formatDuration(song.duration)}</span>
                </div>
            </div>

            <button 
                className='mini-heart liked'
                onClick={handleUnlike}
            >
                ❤️
            </button>

            <audio 
                ref={audioRef} 
                src={song.audioUrl} 
                onTimeUpdate={handleTimeUpdate} 
                onEnded={() => setPlaying(false)}
            />
        </div>
    )
}

export default MiniPlayer