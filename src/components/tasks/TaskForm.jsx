import React, { useEffect, useRef } from 'react'

const TaskForm = ({setTasks}) => {
    const formRef = useRef(null);
    const createTask = (e)=>{
        e.preventDefault();
        const formData = new FormData(formRef.current || event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const newId = crypto.randomUUID();
        const newTask = {
            id:newId,
            ...data
        }
        console.log(newTask)
        setTasks(p=>[...p,newTask])
    }
  return (
    <form className=' flex flex-col justify-center items-center gap-1 py-2 bg-gray-800' onSubmit={createTask} ref={formRef}>
        <h2 className='text-center text-lg py-2'>Create Task</h2>
        <input type="text" name='title' required placeholder='Title' className='p-2 border border-slate-600 rounded-lg' />
        <select name="status">
            <option value="In Progress" selected>In Progress</option>
            <option value="Done">Done</option>
            <option value="Todo">Todo</option>
        </select>
        <div className="task-priority-options flex gap-4">
            <div>Priority: </div>
            <label>
                <input type="radio" name="priority" value="Low" defaultChecked />
                Low
            </label>

            <label>
                <input type="radio" name="priority" value="Medium" defaultChecked />
                Medium
            </label>

            <label>
                <input type="radio" name="priority" value="High" />
                High
            </label>
        </div>
        <input type="submit" value="Create" className='btn' />
    </form>
  )
}

export default TaskForm