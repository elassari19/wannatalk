'use client'

import 'regenerator-runtime/runtime';
import Idle from './sections/Idle';
import Recording from './sections/Recording';
import Stop from './sections/Stop';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { useRecordVoice } from '../hooks/useRecordVioce';
import { addDoc, collection } from 'firebase/firestore';
import { saveSummary } from '../lib/server-action';

const Transcript = () => {
  const [user, setUser] = useAuthState(auth)
  const [postId, setPostId] = useState<string>('') 
  const [summary, setSummary] = useState<any>('')

  // const { status, setStatus, transcript, startSpeech, stopSpeech } = useSpeech();
  const { status, setStatus, transcript, startRecording, stopRecording } = useRecordVoice();

  const getSummary = async () => {
    if(!user?.uid) {
      alert('User not authenticated')
      return
    }
    setStatus('summary')
    setSummary('loading')
    try {
      const response = await fetch('/api/summary', {
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
  
  const addSummaryToDb = async (data: any, id: string) => {
    if(!user?.uid) {
      alert('User not authenticated')
      return
    }
    const docRef = await saveSummary(data, id);

    if(docRef.id) {
      setPostId(docRef.id)
    }
  }

  useEffect(() => {
    if(summary.length > 0 && summary !== 'loading') {
      addSummaryToDb({ text: transcript, summary }, user?.uid!)
    }
  }, [summary])

  return (
    <div className='h-full flex flex-col justify-center items-center px-0 md:px-16'>
      {
        status === 'idle'
          ? <Idle startRecording={startRecording} />
          : status === 'recording'
            ? <Recording stopRecording={stopRecording} status={status} setStatus={setStatus} />
            : status === 'stopped' || status === 'summary'
              ? <Stop
                  transcript={transcript} getSummary={getSummary}
                  postId={postId} setStatus={setStatus}
                  status={status} summary={summary}
                />
              : <p>next</p>
      }
    </div>
  )
}

export default Transcript