import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './components/ui/Sidebar'
import Navbar from './components/ui/Navbar'
import Dashboard from './components/Dashboard'
import TaskForm from './components/tasks/TaskForm'
const App = () => {
  const MAX_TASK = 10;
  const timersRef = useRef({});
  const [deletedTaskIds, setDeletedTaskIds] = useState([]);
  const onUndoDelete = (id)=>{
    clearTimeout(timersRef.current[id]);
    setDeletedTaskIds(p=>p.filter(i=>i!=id))
    delete timersRef.current[id];
  }
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
    setDeletedTaskIds(p=>[...p,id]);
    timersRef.current[id] = setTimeout(() => {
      setTasks(p=>p.filter(t=>t.id!==id))
      setDeletedTaskIds(p=>p.filter(t=>t!=id))
      delete timersRef.current[id];
    }, 5000);
  }
  return (
    <div className='h-full'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <Dashboard tasks={tasks} onAddTask={onAddTask} onEditTask={onEditTask} deletedTaskIds={deletedTaskIds} onUndoDelete={onUndoDelete} onDeleteTask={onDeleteTask} onStatusChange={onStatusChange} isTaskLimitReached={isTaskLimitReached}/>
        {/* <TaskForm /> */}
      </div>
    </div>
  )
}

export default App