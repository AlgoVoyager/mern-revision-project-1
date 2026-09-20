import Sidebar from './components/ui/Sidebar'
import Navbar from './components/ui/Navbar'
import Layout from './components/ui/Layout'
import Dashboard from './components/Dashboard'
import TaskProvider from './context/TaskContext'
import UserProvider from './context/UserContext'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
const App = () => {
  
  return (
    <UserProvider >
      <TaskProvider >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </UserProvider>
  )
}

export default App