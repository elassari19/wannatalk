import React from 'react'

interface IProps {
  transcript: string
}

const Speech = ({ transcript }: IProps) => {
  return (
    <div className='text-start'>
      <h1 className='py-2 text-xl font-semibold text-primary-default text-center'>Transcript</h1>
      {
        transcript === 'loading'
          ? <div className='h-16 w-16 border-[0.5rem] border-l-primary-default animate-spin rounded-full mx-auto' />
          : <p className='max-h-40 overflow-auto p-4 rounded-2xl shadow-3xl-sm shadow-primary-default'>{transcript}</p> 
      }
    </div>
  )
}

export default Speech