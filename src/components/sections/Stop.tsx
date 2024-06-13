import React from 'react'

interface IProps {
  setStatus: (status: string) => void
}
const Stop = ({ setStatus }: IProps) => {

  return (
    <>
      <div className='flex flex-col gap-2 w-full'>
        <button onClick={() => setStatus('share')} className='p-4 w-full rounded-xl border-2 border-primary-default text-primary-default'>Share</button>
        <button
          className='p-4 w-full rounded-xl bg-primary-default text-bg'
          onClick={() => setStatus('summary')}
        >Get Summary</button>
      </div>
      <button onClick={() => setStatus('idle')} className='text-primary-muted underline'>or record another</button>
    </>
  )
}

export default Stop