'use client'
import { redirect } from 'next/navigation'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
}

const WithGuard = ({ children }: IProps) => {
  const [user, setUser] = useAuthState(auth)

  if(!user) return redirect('/')
  return (
    <>
      {children}
    </>
  )
}

export default WithGuard