import React from 'react'
import Sidebar from './components/ui/Sidebar'
import Navbar from './components/ui/Navbar'
import Dashboard from './components/Dashboard'
import  {tasks} from './utils/data'
const App = () => {
  return (
    <div className='h-full'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <Dashboard tasks={tasks}/>
      </div>
    </div>
  )
}

export default App