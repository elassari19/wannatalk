import React from 'react'

interface IProps {
  startRecording: () => void
}

function Idle({ startRecording }: IProps) {
  return (
    <>
      <p className='text-primary-muted text-2xl'>wannatalk?</p>
      <p className='text-primary-foreground text-lg'>simply talk & get a transcription and summary with AI</p>
      <button onClick={startRecording} className='p-4 w-full rounded-xl bg-primary-default text-bg'>Start Talking</button>
      <p className='text-primary-muted text-sm'>Powered by Whisper & OpenAI</p>
    </>
  )
}

export default Idle