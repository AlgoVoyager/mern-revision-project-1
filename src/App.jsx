import React, { useState } from 'react'
import Sidebar from './components/ui/Sidebar'
import Navbar from './components/ui/Navbar'
import Dashboard from './components/Dashboard'
import TaskForm from './components/tasks/TaskForm'
const App = () => {
  const [tasks, setTasks] = useState([
    {
        id: 1,
        title: "Learn React",
        status: "In Progress",
        priority: "High"
    },
    {
        id: 2,
        title: "Build MERN Project",
        status: "Todo",
        priority: "Medium"
    },
    {
        id: 3,
        title: "Practice DSA",
        status: "Done",
        priority: "Low"
    }
  ])
  const onAddTask  = (newTask)=>{
        setTasks(p=>[...p,newTask])
    }
  return (
    <div className='h-full'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <Dashboard tasks={tasks} onAddTask={onAddTask}/>
        {/* <TaskForm /> */}
      </div>
    </div>
  )
}

export default App