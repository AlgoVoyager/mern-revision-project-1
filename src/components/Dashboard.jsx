import React, { useState } from 'react'
import TaskList from './tasks/TaskList';
import TaskForm from './tasks/TaskForm';

const Dashboard = ({tasks, onAddTask, onDeleteTask}) => {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const categories = ["All", "Todo", "In Progress", "Done"];
    const filteredTasks= tasks.filter(t=>selectedCategory==="All" || t.status===selectedCategory)
  return (
    <main className='py-5 space-y-4 w-full'>
        <div className="dashboard-hero mb-10 px-10">
            <h1 className='my-10'>Project Dashboard</h1>
            <h2>Good Morning,  Nishant</h2>
            <h4>{tasks.length} Total Tasks</h4>
        </div>

        <TaskForm onAddTask={onAddTask} />

        <div className="categories pl-10 flex items-center gap-3 border-y py-1 px-2">
            {categories.map((c)=>(
                <button onClick={()=>setSelectedCategory(c)} key={c} 
                className={`px-2 rounded-lg border text-sm ${c==selectedCategory&&'bg-gray-700 text-white'}`}>{c}</button>
            ))}
        </div>

        <TaskList tasks={filteredTasks} onDeleteTask={onDeleteTask} />
        <div className="items-count text-center">Showing {filteredTasks.length} Results</div>
    </main>
  )
}

export default Dashboard