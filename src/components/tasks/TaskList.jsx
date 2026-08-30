import React from 'react'
import TaskCard from './TaskCard'

const TaskList = ({tasks}) => {
  return (
    <div className="tasklist flex gap-4 p-10">
      {tasks&&tasks.map(task=>(
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}

export default TaskList