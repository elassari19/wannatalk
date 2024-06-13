import React from 'react'

interface IProps {
  summary: any
  status: string
}

const Summary = ({ summary, status }: IProps) => {
  return (
    <div className='text-center max-h-40 overflow-auto px-4'>
    {
      summary === 'loading'
        ? <p>loading summary...</p>
        : status === 'summary' && (
          <div className='flex flex-col gap-2'>
            <p className='text-xl text-primary-default font-semibold'>Summary</p>
            {
              summary.error
                ? <p className='text-red-500 text-lg font-semibold'>Error: {summary.error}</p>
                : <p>{summary}</p>
            }
          </div>
        )
    }
    </div>
  )
}

export default Summary