'use client'

import React from 'react'

interface IProps {
  postId: string
}

const ShareButton = ({ postId }: IProps) => {

  const handleShare = async () => {
    await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_BASE_URL + '/chat/' + postId);
  }

  return (
    <button onClick={handleShare} className='p-4 w-[15rem] rounded-xl border-2 border-primary-default text-primary-default'>Share</button>
  )
}

export default ShareButton