'use client'

import { useEffect, useRef, useState } from "react"

const useSpeechRecognition = (option: any) => {
  const [status, setStatus] = useState('idle')
  const [transcript, setTranscript] = useState("")
  const recgnitionRef = useRef<any>(null)

  useEffect(() => {
    if(!('webkitSpeechRecognition' in window)) {
      console.log('Speech Recognition is not supported')
      return 
    }
    recgnitionRef.current = new window.webkitSpeechRecognition()
    const recognition = recgnitionRef.current
    recognition.interimResults = option.interimResults || true
    recognition.continuous = option.continuous || false
    recognition.lang = option.lang || 'en-US'

    if('webkitSpeechGrammarList' in window) {
      const grammars = "#JSGF V1.0; grammar punctuation; public <punc> = . | ? | ! | ; | : ;"
      const speechRecognitionList = new SpeechGrammarList()
      speechRecognitionList.addFromString(grammars, 1)
      recognition.grammars = speechRecognitionList
    }
    recognition.onresult = (event: any) => {
      const text = Array.from(event.results)
        .map((result: any) => result[0])
        .map(result => result.transcript)
        .join('')
      setTranscript(text);
    }

    recognition.onerror = (event: any) => {
      console.log('Error occurred in recognition: ' + event.error)
    }

    recognition.onend = () => {
      if(status === 'recording') {
        recognition.start()
      }
    }

    return () => {
      recognition.stop()
    }

  }, [])

  const startRecording = () => {
    setStatus('recording')
    recgnitionRef.current.start()
  }
  const stopRecording = () => {
    setStatus('stopped')
    recgnitionRef.current.stop()
  }

  return {
    status,
    setStatus,
    transcript,
    startRecording,
    stopRecording,
  }
}

export default useSpeechRecognition