import Link from 'next/link'
import React from 'react'
import WithGuard from '@/components/WithGuard'

const page = () => {
  return (
    <div className='min-h-[38rem] flex flex-col gap-4 items-center justify-between'>

      <WithGuard>
        <div className='flex flex-col items-center gap-2'>
          <h1 className='text-primary-default text-xl font-semibold'>History</h1>
          {
            Array(5).fill(0).map((_, i) => (
              <Link href={`chat/${i}`} className='flex gap-2 text-primary-foreground' key={i}>
                {/* date */}
                <span>{new Date().getUTCFullYear()}</span>
                <span>{new Date().getTime()}</span>
              </Link>
            ))
          }
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