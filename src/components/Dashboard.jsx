import React, { useState } from 'react'
import TaskList from './tasks/TaskList';
import TaskForm from './tasks/TaskForm';
import SearchTask from './tasks/SearchTask';

const Dashboard = ({tasks, onAddTask, onEditTask, onDeleteTask, onStatusChange}) => {
    const stats = tasks.reduce((acc, task) => {
        acc[task.status]++;
        return acc;
    }, {
        Todo: 0,
        "In Progress": 0,
        Done: 0
    });
    const [searchTerm, setsearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const categories = ["All", "Todo", "In Progress", "Done"];
    const filteredTasks= tasks.filter(t=>{
        const categoryMatches = selectedCategory === "All" 
        || t.status === selectedCategory;
        const searchMatches = t.title.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatches && searchMatches;
    })


    const [editingTask, setEditingTask] = useState(null)
    const onEditingTask = (task)=>{
        setEditingTask(task)
    }
    const onCancelEdit = ()=> setEditingTask(null);
    const onSearchChange = (e) => {
        e.preventDefault()
        setsearchTerm(e.target.value);
    }
  return (
    <main className='py-5 space-y-4 w-full'>
        <div className="dashboard-hero mb-10 px-10">
            <h1 className='my-10'>Project Dashboard</h1>
            <h2>Good Morning,  Nishant</h2>
            <h4>{tasks.length} Total Tasks</h4>
        </div>

        <TaskForm onAddTask={onAddTask} onEditTask={onEditTask} editingTask={editingTask} onCancelEdit={onCancelEdit} />

        <div className="categories pl-10 flex items-center gap-3 border-y py-1 px-2">
            {categories.map((c)=>(
                <button onClick={()=>setSelectedCategory(c)} key={c} 
                className={`px-2 rounded-lg border text-sm ${c==selectedCategory&&'bg-gray-700 text-white'}`}>{c} ({c!=='All'?stats[c]:tasks.length})</button>
            ))}
            <SearchTask searchTerm={searchTerm} onSearchChange={onSearchChange} />
        </div>

        <TaskList tasks={filteredTasks} onDeleteTask={onDeleteTask} onEditingTask={onEditingTask} onStatusChange={onStatusChange}/>
        <div className="items-count text-center">Showing {filteredTasks.length} Results</div>
    </main>
  )
}

export default Dashboard