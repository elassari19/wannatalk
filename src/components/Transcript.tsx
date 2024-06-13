'use client'

import 'regenerator-runtime/runtime';
import Idle from './sections/Idle';
import Recording from './sections/Recording';
import Stop from './sections/Stop';
import useSpeech from '../hooks/useSpeechRecognition';

const Transcript = () => {

  const { status, setStatus, transcript, startSpeech, stopSpeech } = useSpeech();

  return (
    <div className='h-screen flex flex-col py-12 md:py-40 justify-between items-center'>
      <div className='text-center w-full px-12 md:w-2/3 lg:w-1/3'>
        <h1 className='py-4 text-xl font-semibold'>Transcript</h1>
        <p>{transcript}</p>
      </div>
      <div 
        className={`
          w-[28rem] h-[28rem] p-20 rounded-full shadow-3xl hover:3xl-hover border
          shadow-primary-default border-primary-default
          flex flex-col justify-center items-center gap-6
          font-semibold text-center
          ${status === 'recording' && 'animate-pulse'}
        `}
      >
        {
          status === 'idle'
            ? <Idle startRecording={startSpeech} />
            : status === 'recording'
              ? <Recording stopRecording={stopSpeech} />
              : status === 'stopped'
                ? <Stop setStatus={setStatus} />
                : <p>next</p>
        }
      </div>
    </div>
  )
}

export default Transcript