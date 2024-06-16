import React from 'react'
import WithGuard from '@/components/WithGuard'
import { getTranscriptById } from '@/lib/server-action'
import Speech from '@/components/sections/Speech'
import Summary from '@/components/sections/Summary'
import ShareButton from '@/components/ShareButton'

interface IProps {
  params: {
    id: string
  }
}

const page = async ({ params}: IProps) => {

  // console.log("params", params)
  const transcript = await getTranscriptById(params.id) as any
  // console.log("transcript", transcript)

  return (
    <div className='pt-28 w-screen min-h-[40rem] flex flex-col justify-around items-center'>
      {
        <WithGuard>
          <div className='w-screen flex flex-col items-center gap-16 px-8 md:w-3/4 lg:w-4/6'>
          <Speech transcript={transcript.text} />
          <Summary summary={transcript.summary} status='summary' />
          </div>
        </WithGuard>
      }
      <ShareButton postId={params.id} />
    </div>
  )
}

export default page