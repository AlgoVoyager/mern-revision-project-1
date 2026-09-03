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

    const priorityOrder = {
        High:3,
        Medium:2,
        Low:1
    }
    const [sortBy, setSortBy] = useState("Newest")
    const sortedTasks = [...filteredTasks].sort((a,b)=>{
        if(sortBy==="Newest") return a;
        else if(sortBy==="Oldest") return b;
        else
            return priorityOrder[b.priority]-priorityOrder[a.priority]}
    );
    console.log(sortedTasks)


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

        <div className="filter-bar pl-10 flex justify-between items-center gap-3 border-y py-1 px-2">
            <div className="categories  flex justify-between items-center gap-3">
                {categories.map((c)=>(
                    <button onClick={()=>setSelectedCategory(c)} key={c} 
                    className={`px-2 rounded-lg border text-sm ${c===selectedCategory&&'bg-gray-700 text-white'}`}>{c} ({c!=='All'?stats[c]:tasks.length})</button>
                ))}
            </div>
            <SearchTask searchTerm={searchTerm} onSearchChange={onSearchChange} />
            <select name="sorting" value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className='px-2 rounded-lg border text-sm'>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Priority">Priority</option>
            </select>
        </div>

        <TaskList tasks={sortedTasks} onDeleteTask={onDeleteTask} onEditingTask={onEditingTask} onStatusChange={onStatusChange}/>
        <div className="items-count text-center">
            {tasks.length === 0
            ?"No Tasks Added yet."
            :(filteredTasks.length === 0
            ?"Try changing your search or filters."
            :`Showing ${filteredTasks.length} Results`)
            }
        </div>
    </main>
  )
}

export default Dashboard