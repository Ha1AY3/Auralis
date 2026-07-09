import React from 'react'
import { useSong } from '../../hooks/useSong'
import "../../styles/recommendedSongs.scss"

const RecommendedSongs = () => {
    const {recommendedSongs, playSong, loading } = useSong();

    const formatDuration = (seconds) => {
        if (!seconds) return '00:00'
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }

    if (loading) {
        return (
            <div className='recommended-songs'>
                <h3 className='section-title'>Recommended for You</h3>
                <div className='loading-state'>Loading...</div>
            </div>
        )
    }
  return (
    <div className='recommended-songs'>
        <h3 className='section-title'>Recommended For You</h3>

        <div className='song-list'>
            {
                recommendedSongs.length === 0 ? (
                    <div className='no-songs'>No recommendations</div>
                ) : (
                    recommendedSongs.map((song, index) => (
                        <div key={song.jamendoId || index} className='song-item' onClick={() => {
                            playSong(song);
                        }}>
                            <div className='song-index'>{index + 1}</div>
                            <div className='song-details'>
                                <h4>{song.name}</h4>
                                <p>{song.artistName}</p>
                            </div>
                            <div className='song-duration'>{formatDuration(song.duration)}</div>
                        </div>
                    ))
                )
            }
        </div>
    </div>
  )
}

export default RecommendedSongs
