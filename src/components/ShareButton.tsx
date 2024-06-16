'use client'

import React from 'react'

interface IProps {
  postId: string
}

const ShareButton = ({ postId }: IProps) => {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  const handleShare = async () => {
    await navigator.clipboard.writeText(baseUrl + '/chat/' + postId);
  }

  return (
    <button onClick={handleShare} className='p-4 w-[15rem] rounded-xl border-2 border-primary-default text-primary-default'>Share</button>
  )
}

export default ShareButton