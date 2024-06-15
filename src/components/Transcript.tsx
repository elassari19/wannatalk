'use client'

import 'regenerator-runtime/runtime';
import Idle from './sections/Idle';
import Recording from './sections/Recording';
import Stop from './sections/Stop';
import useSpeech from '../hooks/useSpeechRecognition';
import { useEffect, useState } from 'react';
import useSpeechRecognition from '../hooks/useRecord';
import { revalidateUrlPath, saveSummary } from '../lib/server-action';
import { redirect } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';

const Transcript = () => {
  const [user, setUser] = useAuthState(auth)

  const [summary, setSummary] = useState<any>('')
  // const { status, setStatus, transcript, startSpeech, stopSpeech } = useSpeech();
  const { status, setStatus, transcript, startRecording, stopRecording } = useSpeechRecognition({ interimResults: true, continuous: false, lang: 'en-US' });

  const getSummary = async () => {
    if(!user?.uid) {
      alert('User not authenticated')
      return
    }
    setStatus('summary')
    setSummary('loading')
    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: transcript })
      })
      const data = await response.json();
      if(data?.error) {
        setSummary({ error: data.error.code})
        return
      }
      if(data.text === '') {
        setSummary({ error: 'No text to summarize'})
        return
      }

      setSummary(data.text)
  
    } catch (error) {
      console.error("Error processing speech:", error);
    }
  }
  
  const readSummary = async (data: string) => {
    console.log('start saving')
    const res = await saveSummary({ text: transcript, summary: data }, user?.uid || '')

    if(res?.status === 200) {
      revalidateUrlPath('/')
    }
  }

  useEffect(() => {
    if(summary.length > 0 && summary !== 'loading') {
      readSummary(summary)
    }
  }, [summary])

  const handleShare = async () => {
    console.log('share')
  }

  return (
    <div className='h-full flex flex-col justify-center items-center px-8 md:px-16'>
      {
        status === 'idle'
          ? <Idle startRecording={startRecording} />
          : status === 'recording'
            ? <Recording stopRecording={stopRecording} status={status} setStatus={setStatus} />
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