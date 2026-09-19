import Sidebar from './components/ui/Sidebar'
import Navbar from './components/ui/Navbar'
import Dashboard from './components/Dashboard'
import TaskProvider from './context/TaskContext'
import UserProvider from './context/UserContext'
const App = () => {
  
  return (
    <UserProvider >
      <TaskProvider >
        <div className='h-full'>
          <Navbar />
          <div className='flex'>
            <Sidebar />
            <Dashboard />
          </div>
        </div>
      </TaskProvider>
    </UserProvider>
  )
}

export default App