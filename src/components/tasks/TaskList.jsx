import React from 'react'
import TaskCard from './TaskCard'

const TaskList = ({tasks, onDeleteTask, onEditingTask, onStatusChange}) => {
  return (
    <div className="tasklist flex gap-4 p-10">
      {tasks&&tasks.map(task=>(
        <TaskCard key={task.id} task={task} onEditingTask={onEditingTask} onDeleteTask={onDeleteTask} onStatusChange={onStatusChange}/>
      ))}
    </div>
  )
}

export default TaskList