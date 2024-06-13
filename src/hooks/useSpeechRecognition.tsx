'use client'

import { useEffect, useState } from "react"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const useSpeech = () => {
  const [status, setStatus] = useState('idle')
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  console.log("transcript", transcript, "listening", listening)

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

  const startSpeech = () => {
    setStatus('recording')

  }
  const stopSpeech = () => {
    setStatus('stopped')
  }

  return {
    transcript,
    startSpeech,
    stopSpeech,
    status,
    setStatus,
  }
}
export default useSpeech