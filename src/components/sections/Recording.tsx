import React from 'react'
import RecordeTime from '../RecordeTime'

interface IProps {
  stopRecording: () => void
  status: string
  setStatus: (status: string) => void
}

const Recording = ({ stopRecording, status, setStatus }: IProps) => {
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
      <p className='text-primary-muted text-2xl'>Recording...</p>
        <button onClick={stopRecording} className='p-4 w-full rounded-xl border-2 border-primary-default text-primary-default'>Tap to stop</button>
        <RecordeTime setStatus={setStatus} />
      <p className='text-primary-muted text-sm'>3 min max</p>

    </div>
  )
}

export default Recording