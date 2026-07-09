import React from 'react'
import FaceExpression from '../../../expression/components/FaceExpression'
import EmotionDisplay from '../emotionDisplay/EmotionDisplay'
import "../../styles/leftpanel.scss"
import { useMood } from '../../../../hooks/useMood'

const LeftPanel = ({detectedEmotion, onEmotionDetected}) => {

  const {addMood} = useMood();

  async function handleEmotionDetected(emotion){
      onEmotionDetected(emotion);
      await addMood(emotion);
  }
  return (
    <div className='left-panel'>
      <div className='header'>
        <h1>How are you feeling today?</h1>
        <p>Your face expression is being analyzed in real time</p>
      </div>

          <div className='camera-container'>
              <FaceExpression onEmotionDetected={handleEmotionDetected} />
          </div>
          
          <div className='emotion-container'>
              <EmotionDisplay detectedEmotion={detectedEmotion} />
          </div>
    </div>
  )
}

export default LeftPanel
