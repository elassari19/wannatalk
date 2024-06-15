import React from 'react'
import Speech from './Speech'
import Summary from './Summary'
import SummaryButton from '../SummaryButton'

interface IProps {
  setStatus: (status: string) => void
  status: string
  getSummary: () => void
  share: () => void
  transcript: string
  summary: any
}
const Stop = ({ share, getSummary, status, setStatus, transcript, summary }: IProps) => {

  return (
    <div className='flex-1 flex flex-col justify-between items-center mt-24 mb-16'>
      <div className='flex flex-col gap-8 w-full md:w-3/4 lg:w-4/6'>
        <Speech transcript={transcript} />
        <Summary status={status} summary={summary} />
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex flex-col gap-2 w-full justify-center items-center'>
          <button onClick={share} className='p-4 w-[15rem] rounded-xl border-2 border-primary-default text-primary-default'>Share</button>
          {
            status === 'stopped' && (
              <SummaryButton getSummary={getSummary} />
            )
          }
        </div>
        <button onClick={() => setStatus('idle')} className='text-primary-muted underline'>or record another</button>
      </div>
    </div>
  )
}

export default Stop