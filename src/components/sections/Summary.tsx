import React from 'react'

interface IProps {
  summary: any
  status: string
}

const Summary = ({ summary, status }: IProps) => {
  // console.log('summary', summary)
  return (
    <div className='text-start'>
    {
      status === 'summary' && (
        <div className='flex flex-col gap-8'>
          <p className='text-xl text-primary-default font-semibold text-center'>Summary</p>
          {
            summary === 'loading'
              ? <div className='h-16 w-16 border-[0.5rem] border-l-primary-default animate-spin rounded-full mx-auto' />
              : summary.error
                ? <p className='text-red-500 text-lg font-semibold'>Error: {summary.error}</p>
                : <p className='max-h-40 overflow-auto p-4 rounded-2xl shadow-3xl-sm shadow-primary-default'>
                  {summary}
                </p>
          }
        </div>
        )
    }
    </div>
  )
}

export default Summary