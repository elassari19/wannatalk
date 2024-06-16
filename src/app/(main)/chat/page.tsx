import Link from 'next/link'
import React from 'react'
import WithGuard from '@/components/WithGuard'
import { fetchTranscripts } from '../../../lib/server-action'
import History from '../../../components/History'

interface IProps {
  searchParams: {
    id: string
  }
}

const page = async ({ searchParams }: IProps) => {
  // const data = await fetchTranscripts(searchParams.id)

  return (
    <div className='min-h-[38rem] mt-28 flex flex-col gap-4 items-center justify-between'>

      <WithGuard>
        <div className='flex flex-col items-center gap-2'>
          <h1 className='text-primary-default text-xl font-semibold'>History</h1>
          <History id={searchParams.id} />
          {/* {
            data.map((doc: any, i) => (
              <Link href={`chat/${doc.id}`} className='flex gap-2 text-primary-foreground' key={i}>
                <span>{new Date(doc.createdAt).toLocaleString()}: </span>
                <span>{doc.text.slice(0, 20)}</span>
              </Link>
            ))
          } */}
        </div>
      </WithGuard>

      <div className='flex flex-col gap-2 items-center'>
        <Link href="/" className='bg-primary-muted text-bg p-4 px-12 rounded-xl text-sm font-semibold'>Record another</Link>
        <Link href="/" className='text-primary-muted underline'>or record another</Link>
      </div>
    </div>
  )
}

export default page