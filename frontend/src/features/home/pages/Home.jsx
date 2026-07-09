import React, { useState } from 'react'
import "../styles/home.scss"
import LeftPanel from '../components/leftpanel/LeftPanel';
import { useSong } from '../hooks/useSong';
import RightPanel from '../components/rightPanel/RightPanel';
import Navbar from '../../../components/navbar/Navbar';

const Home = () => {

  const [detectedEmotion, setDetectedEmotion] = useState("neutral");

  const {currentEmotion, updateEmotion} = useSong();

  function handleEmotionDetected(emotion){
    setDetectedEmotion(emotion);
  }


  return (
    <div className="home-container">
      <Navbar />
      <div className="blob-top" />
      <div className="blob-mid" />
      <div className="blob-purple" />
      <div className="blob-bottom" />

      <div className="content">
          <div className='main-layout'>
            <LeftPanel
              detectedEmotion={currentEmotion}
              onEmotionDetected={updateEmotion}
            />

            <RightPanel />
          </div>
      </div>
    </div>
  );
}

export default Home
