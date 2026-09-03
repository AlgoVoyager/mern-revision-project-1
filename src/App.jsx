import React, { useEffect, useState } from 'react'
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
        priority: "Medium"
    },
    {
        id: 2,
        title: "Build MERN Project",
        status: "Todo",
        priority: "High"
    },
    {
        id: 3,
        title: "Practice DSA",
        status: "Done",
        priority: "Low"
    }
  ])
  const statuses = ["Todo", "In Progress", "Done"];
  const onStatusChange = (id) => {
    const task = tasks.find(t=>t.id==id);
    const statusIndex = statuses.findIndex(s=>s==task.status);
    const nextIndex = (statusIndex+1)%statuses.length;
    setTasks(p=>p.map(t=>{
      if(t.id==id) return{
        ...t, status: statuses[nextIndex]
      }
      else return t
    }))
  }
  const onAddTask  = (newTask)=>{
        setTasks(p=>[...p,newTask])
  }
  const onEditTask = (updatedTask) => {
    setTasks(p=>p.map(t=>t.id===updatedTask.id?updatedTask:t))
  }
  const onDeleteTask = (id)=>{
    setTasks(prevTasks =>
      prevTasks.filter(task => task.id !== id)
    );
  }
  return (
    <div className='h-full'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <Dashboard tasks={tasks} onAddTask={onAddTask} onEditTask={onEditTask} onDeleteTask={onDeleteTask} onStatusChange={onStatusChange}/>
        {/* <TaskForm /> */}
      </div>
    </div>
  )
}

export default App