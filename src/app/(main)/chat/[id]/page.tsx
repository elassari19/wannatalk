import React from 'react'
import WithGuard from '@/components/WithGuard'
import { getTranscriptById } from '@/lib/server-action'
import Speech from '@/components/sections/Speech'
import Summary from '@/components/sections/Summary'

interface IProps {
  params: {
    id: string
  }
}

const page = async ({ params}: IProps) => {

  console.log("params", params)
  const transcript = await getTranscriptById(params.id) as any
  console.log("transcript", transcript)

  return (
    <div className='pt-28 w-screen flex justify-center items-center'>
      {
        <WithGuard>
          <div className='w-screen flex flex-col items-center gap-16 px-8 md:w-3/4 lg:w-4/6'>
          <Speech transcript={transcript.text} />
          <Summary summary={transcript.summary} status='summary' />
          </div>
        </WithGuard>
      }
    </div>
  )
}

export default page