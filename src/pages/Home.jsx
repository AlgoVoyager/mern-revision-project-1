import React from 'react'

const Home = () => {
  return (
    <main className='h-full'>
          <Navbar />
          <div className='flex'>
            <Sidebar />
            {/* <Dashboard /> */}
            {/* <Login /> */}
          </div>
    </main>
  )
}

export default Home