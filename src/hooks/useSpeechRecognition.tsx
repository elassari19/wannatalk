'use client'

import { useEffect, useState } from "react"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const useSpeech = () => {
  const [status, setStatus] = useState('idle')
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (status === 'recording') {
      SpeechRecognition.startListening({ continuous: true });
    }
    if (status === 'stopped') {
      SpeechRecognition.stopListening();
    }
    if (status === 'idle') {
      SpeechRecognition.stopListening();
      resetTranscript();
    }
  }, [status])

  const startRecording = () => {
    setStatus('recording')

  }
  const stopRecording = () => {
    setStatus('stopped')
  }

  return {
    transcript,
    startRecording,
    stopRecording,
    status,
    setStatus,
  }
}
export default useSpeech