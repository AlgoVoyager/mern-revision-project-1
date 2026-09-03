import React, { useEffect, useState } from 'react'
import Sidebar from './components/ui/Sidebar'
import Navbar from './components/ui/Navbar'
import Dashboard from './components/Dashboard'
import TaskForm from './components/tasks/TaskForm'
const App = () => {
  const MAX_TASK = 10;
  const [tasks, setTasks] = useState(()=>{
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks?JSON.parse(storedTasks):[];
  })
  const isTaskLimitReached = tasks.length >= MAX_TASK;
  useEffect(()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
  },[tasks])
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
    if(isTaskLimitReached) return alert("maximum tasks limit reached.")
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
        <Dashboard tasks={tasks} onAddTask={onAddTask} onEditTask={onEditTask} onDeleteTask={onDeleteTask} onStatusChange={onStatusChange} isTaskLimitReached={isTaskLimitReached}/>
        {/* <TaskForm /> */}
      </div>
    </div>
  )
}

export default App