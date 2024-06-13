import React from 'react'

interface IProps {
  transcript: string
}

const Speech = ({ transcript }: IProps) => {
  return (
    <div className='text-center max-h-40 overflow-auto'>
      <h1 className='py-2 text-xl font-semibold text-primary-default'>Transcript</h1>
      <p>{transcript}</p>
    </div>
  )
}

export default Speech