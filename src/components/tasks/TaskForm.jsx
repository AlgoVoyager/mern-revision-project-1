import{useEffect, useState}from 'react'
import { useContext } from 'react';
import { useTaskContext } from '../../context/TaskContext';
const DEFAULT_FORM = {
    title: "",
    status: "Todo",
    priority: "Medium",
};

const TaskForm = ({editingTask, onCancelEdit}) => {
    const {onAddTask, onEditTask, isTaskLimitReached} = useTaskContext()
    const isCreateDisabled = !editingTask && isTaskLimitReached;
    const [formData, setFormData] = useState(DEFAULT_FORM);
    useEffect(() => {
        if(editingTask){
            const {id, ...taskData} = editingTask;
            setFormData(taskData)
        }else setFormData(DEFAULT_FORM)
    }, [editingTask])
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(formData.title.trim()===''){
            alert('title must be filled')
            return;
        }
        if(editingTask){
            onEditTask({id:editingTask.id,...formData});
            onCancelEdit();
        }else{

            const newTask = {
                ...formData,
                id: crypto.randomUUID(),
                createdAt : new Date().toISOString()
            }
            onAddTask(newTask);
            setFormData(DEFAULT_FORM)
        }

    }
     const handleChange = (event) => {
        const { name, value } = event.target; 
        
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
  return (
    <form className=' flex flex-col justify-center items-center gap-1 py-2 bg-gray-800' 
    onSubmit={handleSubmit}>
        <h2 className='text-center text-lg py-2'>{editingTask?"Edit Task":"Create Task"}</h2>
        <input type="text" name='title' required placeholder='Title' className='p-2 border border-slate-600 rounded-lg' value={formData.title}  onChange={handleChange}/>
        <select name="status" value={formData.status} onChange={handleChange}>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Todo">Todo</option>
        </select>
        <div className="task-priority-options flex gap-4">
            <div>Priority: </div>
            <label>
                <input type="radio" name="priority" value="Low"  onChange={handleChange} checked={formData.priority === 'Low'}/>
                Low
            </label>

            <label>
                <input type="radio" name="priority" value="Medium"  onChange={handleChange} checked={formData.priority === 'Medium'} />
                Medium
            </label>

            <label>
                <input type="radio" name="priority" value="High"  onChange={handleChange} checked={formData.priority === 'High'} />
                High
            </label>
        </div>
        <input type="submit" value={editingTask?"Update":"Create"} disabled={isCreateDisabled} className={`btn ${isCreateDisabled&&'btn-disabled'}`} />
        {editingTask&&<button type='button' onClick={()=>onCancelEdit()} className='btn'>Cancel</button>}
    </form>
  )
}

export default TaskForm