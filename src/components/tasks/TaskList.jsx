import React from 'react'
import TaskCard from './TaskCard'

const TaskList = ({tasks, onDeleteTask, onEditingTask}) => {
  return (
    <div className="tasklist flex gap-4 p-10">
      {tasks&&tasks.map(task=>(
        <TaskCard key={task.id} task={task} onEditingTask={onEditingTask} onDeleteTask={onDeleteTask} />
      ))}
    </div>
  )
}

export default TaskList