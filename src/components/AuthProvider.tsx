'use client'

import React, { useEffect } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app, auth } from '@/lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { revalidateUrlPath } from '../lib/server-action'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getFirestore } from 'firebase/firestore'
import Image from 'next/image'
import logo from '@/assets/logo.svg'

const AuthProvider = () => {
  const [user, setUser] = useAuthState(auth)
  const db = getFirestore(app);

  const googleAuth = new GoogleAuthProvider()

  const loginWithGoogle = async () => {
    try {
      const responese = await signInWithPopup(auth, googleAuth)
      sessionStorage.setItem('user', JSON.stringify(user))
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
    }
  }, [user])

    return (
    <>
      <Link href="/" className='rounded-lg p-2'>
        <Image src={logo} alt="Logo" width={30} height={30} />
      </Link>
      {
        user
        ? <>
            <Link href={`/chat?id=${user.uid}`} className='text-primary-muted text-sm font-bold hover:bg-primary-default/20 p-2 rounded-md'>Recent Summary</Link>
            <button className='p-2 text-primary-default border border-primary-default rounded-full px-4 text-sm' onClick={loginOut}>Sign Out</button>
          </>
        : <button className='p-2 border border-primary-default rounded-full px-4 text-primary-default hover:bg-primary-default/20 text-sm' onClick={loginWithGoogle}>Login</button>
      }
    </>
  )
}

export default AuthProvider