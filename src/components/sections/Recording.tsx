import React from 'react'

interface IProps {
  stopRecording: () => void
}

const Recording = ({ stopRecording }: IProps) => {
  return (
    <>
      <p className='text-primary-muted text-2xl'>Recording...</p>
        <button onClick={stopRecording} className='p-4 w-full rounded-xl border-2 border-primary-default text-primary-default'>Tap to stop</button>
      <div className='flex gap-4 items-center'>
        <div className='w-8 h-8 rounded-full p-1 bg-primary-default flex justify-center items-center'>
          <div className='w-4 h-4 border-2 border-bg rounded-full' />
        </div>
        <p className='text-primary-default tex-lg'>00:01</p>
      </div>
      <p className='text-primary-muted text-sm'>3 min max</p>

    </>
  )
}

export default Recording