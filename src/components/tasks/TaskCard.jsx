import { useTaskContext } from '../../context/TaskContext';

const TaskCard = ({task, onEditingTask}) => {
    const {onDeleteTask, onStatusChange} = useTaskContext()
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
    <div className=' fade-1 rounded-xl border hover:shadow-xl duration-100 flex flex-col gap-1 p-2'>
        <DisplayDate dateval={task.createdAt} />
        <h3 className='py-1  text-white'>{task.title}</h3>
        <div className={`task-status text-sm rounded-md p-1 w-fit cursor-pointer ${task_status_color} `} onClick={()=>onStatusChange(task.id)} title='Click to change'>{task.status}</div>
        <div className={"task-priority text-sm rounded-md p-1 w-fit "+priority_color}>{task.priority} Priority</div>
        <DisplayDate dateval={task.dueDate} mode={"due"} />
        <button onClick={()=>{onEditingTask(task)}}>✏️</button>
        <button onClick={()=>{onDeleteTask(task.id)}}>🗑️</button>
    </div>
  )
}
const DisplayDate = ({mode, dateval})=>{
    if(!dateval) return;
    const dateString = new Date(dateval).toDateString();
    const isToday = dateString==new Date().toDateString();
    const isTommorow = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString()===new Date(dateval).toLocaleDateString()
    return(
        <div className="displayDate">
            <div className='text-center border border-primary text-primary-200 bg-primary-800 rounded-md w-fit mx-auto px-1 text-xs'>
                <div className='text-[0.5rem] w-fit mx-auto leading-2'>{mode=="due"?"Due Date":"Created"}</div>
                {isToday?"Today":isTommorow?"Tommorow":dateString}
            </div>
        </div>
    )
}

export default TaskCard