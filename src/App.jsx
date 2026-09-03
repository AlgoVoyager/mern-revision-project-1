import Sidebar from './components/ui/Sidebar'
import Navbar from './components/ui/Navbar'
import Dashboard from './components/Dashboard'
import { useTasks } from './hooks/useTasks'
import TaskProvider from './context/TaskContext'
const App = () => {
  
  return (
    <TaskProvider >
      <div className='h-full'>
        <Navbar />
        <div className='flex'>
          <Sidebar />
          <Dashboard />
        </div>
      </div>
    </TaskProvider>
  )
}

export default App