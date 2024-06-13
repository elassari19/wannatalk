import React from 'react'

interface IProps {
  startRecording: () => void
}

const StartTallking = ({ startRecording }: IProps) => {
  return (
    <div 
      className={`
        w-[26rem] h-[26rem] p-16 rounded-full shadow-3xl hover:3xl-hover border
        shadow-primary-default border-primary-default
        flex flex-col justify-center items-center gap-4
        font-semibold text-center
        ${status === 'recording' && 'animate-pulse'}
      `}
    >
      <p className='text-primary-muted text-2xl'>wannatalk?</p>
      <p className='text-primary-foreground text-lg'>simply talk & get a transcription and summary with AI</p>
      <button onClick={startRecording} className='p-4 w-full rounded-xl bg-primary-default text-bg'>Start Talking</button>
      <p className='text-primary-muted text-sm'>Powered by Whisper & OpenAI</p>
    
    </div>
  )
}

export default StartTallking