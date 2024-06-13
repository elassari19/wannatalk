'use client'

import 'regenerator-runtime/runtime';
import Idle from './sections/Idle';
import Recording from './sections/Recording';
import Stop from './sections/Stop';
import useSpeech from '../hooks/useSpeechRecognition';
import { useState } from 'react';

const Transcript = () => {
  const [summary, setSummary] = useState<any>('')
  const { status, setStatus, transcript, startSpeech, stopSpeech } = useSpeech();

  const getSummary = async () => {
    setStatus('summary')
    setSummary('loading')
    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: transcript })
      })
      const data = await response.json();
      if(data.error) {
        setSummary({ error: data.error.code})
        return
      }

      setSummary(data.text)
    } catch (error) {
      console.error("Error processing speech:", error);
    }
  }

  const handleShare = async () => {
    console.log('share')
  }

  return (
    <div className='min-h-[30rem] flex flex-col justify-center items-center py-4 px-8 md:px-16'>
      {
        status === 'idle'
          ? <Idle startRecording={startSpeech} />
          : status === 'recording'
            ? <Recording stopRecording={stopSpeech} status={status} />
            : status === 'stopped' || status === 'summary'
              ? <Stop
                  transcript={transcript} getSummary={getSummary}
                  share={handleShare} setStatus={setStatus}
                  status={status} summary={summary}
                />
              : <p>next</p>
      }
    </div>
  )
}

export default Transcript