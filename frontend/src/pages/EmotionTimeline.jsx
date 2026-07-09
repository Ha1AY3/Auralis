import React, { useEffect } from 'react'
import { useMood } from '../hooks/useMood'
import Navbar from '../components/navbar/Navbar';
import "../styles/emotionTimeline.scss";

const EmotionTimeline = () => {
    const {moods, moodStats, loadMood, loading} = useMood();

    useEffect(() => {
      loadMood();
    }, []);

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getEmoji = (emotion) => {
        const emojis = {
            happy: '😊',
            sad: '😢',
            angry: '😠',
            surprised: '😲',
            neutral: '😐'
        };
        return emojis[emotion] || '😐';
    };

    if (loading) {
        return (
            <div className='emotion-timeline-page'>
                <Navbar />
                <div className='loading-state'>Loading your mood history...</div>
            </div>
        );
    }


  return (
    <div className='emotion-timeline-page'>
        <Navbar />

        <div className='timeline-content'>
            <h2>Emotion Timeline</h2>

            {
              moodStats && (
                  <div className='stats-section'>
                      <h3>Your Mood Stats</h3>

                      <div className='stats-grid'>
                          {Object.entries(moodStats.percentage).map(([emotion, percentage]) => (
                              <div key={emotion} className='stat-item'>
                                  <span className='stat-emoji'>{getEmoji(emotion)}</span>
                                  <span className='stat-label'>{emotion}</span>
                                  <span className='stat-percentage'>{percentage}%</span>
                                  <div className='stat-bar'>
                                      <div className='stat-fill' style={{ width : `${percentage}%`}}></div>
                                  </div>
                              </div>
                          ))}
                      </div>
                      <p className='total-moods'>Total moods tracked: {moodStats.stats.total}</p>
                  </div>
              )
            }

            <div className='timeline-section'>
                <h3>Mood Timeline</h3>

                {moods.length  === 0 ? (
                    <div className='empty-state'>
                        <p>No emotions record yet.</p>
                        <p>Go home and detect your emotion!</p>
                    </div>
                ): (
                    <div className='timeline-list'>
                        {moods.map((mood) => (
                            <div key={mood._id} className='timeline-item'>
                                <div className='timeline-emoji'>{getEmoji(mood.emotion)}</div>
                                <div className='timeline-details'>
                                    <div className='timeline-emotion'>{mood.emotion}</div>
                                    {mood.songName && (
                                        <div className='timeline-song'>🎵 {mood.songName}</div>
                                    )}
                                </div>
                                <div className='timeline-date'>
                                    {formatDate(mood.timestamp)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      
    </div>
  )
}

export default EmotionTimeline
