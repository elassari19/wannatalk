'use client'

import React, { useEffect, useState } from 'react'

interface IProps {
  setStatus: (status: string) => void
}

const RecordeTime = ({ setStatus }: IProps) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    if(time === 180000) {
      console.log('time up', time)
      setStatus('stopped')
    }
    const timer = setTimeout(() => {
      setTime(time + 1000)
    }, 1000)
    return () => clearTimeout(timer)
  }
  , [time])

  return (
    <div className='flex gap-4 items-center'>
      <div className='w-8 h-8 rounded-full p-1 bg-primary-default flex justify-center items-center'>
        <div className='w-4 h-4 border-2 border-bg rounded-full' />
      </div>
      <p className='text-primary-default tex-lg'>
        0{new Date(time).getMinutes()} : {new Date(time).getSeconds()<10? `0${new Date(time).getSeconds()}`:new Date(time).getSeconds()}
      </p>
    </div>
  )
}

export default RecordeTime