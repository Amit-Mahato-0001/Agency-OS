import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='min-h-screen bg-gray-100 items-center flex items-center justify-center'>
        {children}
    </div>
  )
}

export default AuthLayout