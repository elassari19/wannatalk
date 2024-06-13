import React from 'react'
import AuthProvider from '../AuthProvider'

const Header = () => {
  return (
    <div className='w-full flex items-center justify-between p-4 md:px-12 bg-bg fixed top-0 shadow-lg shadow-primary-default/30'>
      <AuthProvider />
    </div>
  )
}

export default Header