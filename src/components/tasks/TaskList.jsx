import TaskCard from './TaskCard'

const TaskList = ({tasks,onEditingTask}) => {
  return (
    <div className="tasklist flex gap-4 p-10">
      {tasks&&tasks.map(task=>(
        <TaskCard key={task.id} task={task} onEditingTask={onEditingTask}/>
      ))}
    </div>
  )
}

export default TaskList