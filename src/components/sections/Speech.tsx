import React from 'react'

interface IProps {
  transcript: string
}

const Speech = ({ transcript }: IProps) => {
  return (
    <div className='text-start'>
      <h1 className='py-2 text-xl font-semibold text-primary-default text-center'>Transcript</h1>
      <p className='max-h-40 overflow-auto p-4 rounded-2xl shadow-3xl-sm shadow-primary-default'>{transcript}</p>
    </div>
  )
}

export default Speech