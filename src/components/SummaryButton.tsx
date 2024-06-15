'use client'

import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { revalidateUrlPath } from '../lib/server-action'

interface IProps {
  getSummary: () => void
}

const SummaryButton = ({ getSummary }: IProps) => {

  const [user, setUser] = useAuthState(auth)
  const googleAuth = new GoogleAuthProvider()


  const loginWithGoogle = async () => {
    try {
      const responese = await signInWithPopup(auth, googleAuth)
      sessionStorage.setItem('user', JSON.stringify(user))
      return revalidateUrlPath('/')
    } catch (error) {
      console.error("Error logging in with Google:", error)
    }
  }

  return (
    <div>
      {
        user
          ? (
            <button
              className='p-4 w-[15rem] rounded-xl bg-primary-default text-bg'
              onClick={getSummary}
            >Get Summary</button>
          )
          : (
            <button className='p-4 w-[15rem] rounded-xl bg-primary-default text-bg text-sm' onClick={loginWithGoogle}>
              Login to Get Summary
            </button>
          )
      }
    </div>
  )
}

export default SummaryButton