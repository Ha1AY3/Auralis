import React from 'react'
import "../../styles/emotion.display.scss";

const EmotionDisplay = ({detectedEmotion = "neutral"}) => {
    const emotions = [
        { id: 'happy', emoji: '😊', label: 'Happy' },
        { id: 'angry', emoji: '😠', label: 'Angry' },
        { id: 'sad', emoji: '😢', label: 'Sad' },
        { id: 'surprised', emoji: '😲', label: 'Surprised' },
        { id: 'neutral', emoji: '😐', label: 'Neutral' },
    ];
  return (
    <div className='emotion-display'>
        <div className='emotion-grid'>
            {
                emotions.map((emotion) => (
                    <div key={emotion.id} className={`emotion-item ${detectedEmotion === emotion.id ? 'active': ''}`}>
                        <div className='emotion-emoji'>{emotion.emoji}</div>
                        <div className='emotion-name'>{emotion.label}</div>
                    </div>
                ))
            }
        </div>
      
    </div>
  )
}

export default EmotionDisplay
