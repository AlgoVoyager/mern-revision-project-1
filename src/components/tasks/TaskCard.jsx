import React from 'react'

const TaskCard = ({task,onDeleteTask, onEditingTask, onStatusChange}) => {
    let task_status_color;
    let priority_color;
    switch (task.status) {
        case "Todo":
            task_status_color = "text-gray-600 bg-gray-100 border border-gray-600"
            break;
        case "In Progress":
            task_status_color = "text-blue-600 bg-blue-100 border border-blue-600"
            break;
        case "Done":
            task_status_color = "text-green-600 bg-green-100 border border-green-600"
            break;
    
        default:
            task_status_color = ""
            break;
    }
    switch (task.priority) {
        case "High":
            priority_color = "text-red-600 bg-red-100 border border-red-600"
            break;
        case "Medium":
            priority_color = "text-blue-600 bg-blue-100 border border-blue-600"
            break;
        case "Low":
            priority_color = "text-gray-600 bg-gray-100 border border-gray-600"
            break;
    
        default:
            priority_color = ""
            break;
    }
  return (
    <div className='rounded-xl border hover:shadow-xl duration-100 space-y-2 p-5'>
        <h3 className='py-2 mb-2 text-white'>{task.id}. {task.title}</h3>
        <div className={`task-status text-sm rounded-md p-1 w-fit cursor-pointer ${task_status_color} `} onClick={()=>onStatusChange(task.id)} title='Click to change'>{task.status}</div>
        <div className={"task-priority text-sm rounded-md p-1 w-fit "+priority_color}>{task.priority} Priority</div>
        <button onClick={()=>{onEditingTask(task)}}>✏️</button>
        <button onClick={()=>{onDeleteTask(task.id)}}>🗑️</button>
    </div>
  )
}

export default TaskCard