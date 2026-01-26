import React from 'react'

const AppLayout = ({children}) => {
  return (
    <div>
        <header className='text-gray-500 font-bold text-4xl shadow p-4'>i js be chillin fr...</header>
        <main className='p-4'>{children}</main>
    </div>
  )
}

export default AppLayout