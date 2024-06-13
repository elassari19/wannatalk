'use client'

import React, { useEffect } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { revalidateUrlPath } from '../lib/server-action'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const AuthProvider = () => {
  const [user, setUser] = useAuthState(auth)

  const googleAuth = new GoogleAuthProvider()

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuth)
      sessionStorage.setItem('user', JSON.stringify(user))
      return revalidateUrlPath('/')
    } catch (error) {
      console.error("Error logging in with Google:", error)
    }
  }

  const loginOut = async () => {
    try {
      await auth.signOut()
      sessionStorage.removeItem('user')
      redirect('/')
      return revalidateUrlPath('/')
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  useEffect(() => {
    if(user) {
      sessionStorage.setItem('user', JSON.stringify(user))
      console.log('User:', user)
    }
  }, [user])

    return (
    <>
      <Link href="/" className='text-sm bg-primary-default text-bg rounded-lg p-2'>WannaTalk AI</Link>
      {
        user
        ? <>
            <Link href="/chat" className='text-primary-muted text-sm font-bold hover:bg-primary-default/20 p-2 rounded-md'>Recent Summary</Link>
            <button className='p-2 bg-bg border border-primary-default rounded-md text-sm' onClick={loginOut}>Sign Out</button>
          </>
        : <button className='p-2 bg-primary-default rounded-md text-bg text-sm' onClick={loginWithGoogle}>Login with Google</button>
      }
    </>
  )
}

export default AuthProvider