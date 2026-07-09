import React, { useEffect } from 'react'
import { useSong } from '../features/home/hooks/useSong'
import Navbar from '../components/navbar/Navbar';
import MiniPlayer from '../components/miniPlayer/MiniPlayer';
import "../styles/likedSongs.scss";

const LikedSongs = () => {

  const {likes, loadLikes, loading} = useSong();

  useEffect(() => {
    loadLikes();
  }, []);

  if (loading) {
    return (
      <div className='favorites-page'>
        <Navbar />
        <div className='loading-state'>Loading...</div>
      </div>
    )
  }
  return (
    <div className='favorites-page'>
        <Navbar />

        <div className='favorites-content'>
            <h2>❤️ Liked Songs</h2>

            {likes.length === 0 ? (
                <div className='empty-state'>
                    <p>No liked songs</p>
                    <p className='empty-hint'>Go to home and like some songs</p>
                </div>
            ): (
                <div className='favorites-list'>
                    {likes.map((song) => (
                        <MiniPlayer key={song.jamendoId} song={song}/>
                    ))}
                </div>
            )}
        </div>
      
    </div>
  )
}

export default LikedSongs
