import React, { useRef, useEffect, useState } from 'react';
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { mapBlendshapesToEmotion } from '../utils/emotionUtil';
import { initializeFaceLandmarker } from '../services/mediapipeService';
import "../styles/face.expression.scss"

const FaceExpression = ({ onEmotionDetected }) => {
    const videoRef = useRef(null);
    const faceLandmarkerRef = useRef(null);

    const [isModelLoading, setIsModelLoading] = useState(true);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [detectedEmotion, setDetectedEmotion] = useState('neutral');
    const [faceDetected, setFaceDetected] = useState(false);
    const [isDetecting, setIsDetecting] = useState(false);

    // const emotionConfig = {
    //     happy: { emoji: '😊', label: 'Happy', color: '#FFD700' },
    //     sad: { emoji: '😢', label: 'Sad', color: '#4A90E2' },
    //     angry: { emoji: '😠', label: 'Angry', color: '#E23A3A' },
    //     surprised: { emoji: '😲', label: 'Surprised', color: '#9B59B6' },
    //     neutral: { emoji: '😐', label: 'Neutral', color: '#A0A0B0' }
    // };

    // const currentEmotion = emotionConfig[detectedEmotion] || emotionConfig.neutral;

    useEffect(() => {
        const loadModel = async() => {
            try {
                const landmarker = await initializeFaceLandmarker();


                faceLandmarkerRef.current = landmarker;
                setIsModelLoading(false);
                console.log("MediaPipe loaded");
            } catch (error) {
                console.error("Failed to load:", error);
                setIsModelLoading(false);
            }
        }

        loadModel();

        return () => {
            if (faceLandmarkerRef.current) {
                faceLandmarkerRef.current.close();
            }
        };
    }, []);

    useEffect(() => {
        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 640, height: 480 }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    
                    videoRef.current.onloadedmetadata = async () => {
                        await videoRef.current.play();
                        setIsCameraReady(true);
                    };
                }
            } catch (error) {
                console.error("❌ Webcam error:", error);
            }
        };

        if (!isModelLoading) {
            startWebcam();
        }
    }, [isModelLoading]);

    const detectFace = () => {
        if (!videoRef.current || !faceLandmarkerRef.current) {
            return;
        }

        if (videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
            setIsDetecting(false);
            return;
        }
        try {
            const startTimeMs = performance.now();
            const results = faceLandmarkerRef.current.detectForVideo(
                videoRef.current,
                startTimeMs
            );

            if (results?.faceBlendshapes?.[0]?.categories) {
                const blendshapes = results.faceBlendshapes[0].categories;
                const emotion = mapBlendshapesToEmotion(blendshapes);

                setDetectedEmotion(emotion);
                setFaceDetected(true);

                if(onEmotionDetected){
                    onEmotionDetected(emotion);
                }

                console.log("Emotion detected:", emotion);
            } else {
                setFaceDetected(false);
                console.log("No face detected");
            }
        } catch (error) {
            console.error("Detection error: ",error)
        }

        setIsDetecting(false);
    }

    const handleDetect = () => {
        if (isDetecting) return;
        if (!faceLandmarkerRef.current) {
            console.log(" Model not ready");
            return;
        }
        if (!videoRef.current || videoRef.current.videoWidth === 0) {
            console.log(" Camera not ready");
            return;
        }

        setIsDetecting(true);
        detectFace(); 
    };
    return (
        <div className="face-expression">
            <div className="camera-wrapper">
                <div
                    className="camera-circle"
                >
                    {isModelLoading ? (
                        <div className="loading-state">
                            <p>Loading AI Model...</p>
                        </div>
                    ) : (
                        <video
                            ref={videoRef}
                            className="video-feed"
                            autoPlay
                            playsInline
                            muted
                        />
                    )}
                </div>
            </div>

            <button
                className="detect-btn"
                onClick={handleDetect}
                disabled={isDetecting}
            >
                {isDetecting ? 'Analyzing...' : 'Analyze My Emotion'}
            </button>
        </div>
    )
}

export default FaceExpression
