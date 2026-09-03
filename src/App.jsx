import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './components/ui/Sidebar'
import Navbar from './components/ui/Navbar'
import Dashboard from './components/Dashboard'
import { useTasks } from './hooks/useTasks'
const App = () => {
  const {
    tasks,
    deletedTaskIds,
    isTaskLimitReached,
    onAddTask,
    onEditTask,
    onStatusChange,
    onDeleteTask,
    onUndoDelete
  } = useTasks();
  return (
    <div className='h-full'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <Dashboard tasks={tasks} onAddTask={onAddTask} onEditTask={onEditTask} deletedTaskIds={deletedTaskIds} onUndoDelete={onUndoDelete} onDeleteTask={onDeleteTask} onStatusChange={onStatusChange} isTaskLimitReached={isTaskLimitReached}/>
      </div>
    </div>
  )
}

export default App