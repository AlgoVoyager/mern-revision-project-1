import React from 'react'
import TaskList from './tasks/TaskList';

const Dashboard = ({tasks}) => {
    const categories = ["All", "Todo", "In Progress", "Done"];
  return (
    <main className='py-5 space-y-4 w-full'>
        <div className="dashboard-hero mb-10 px-10">
            <h1 className='my-10'>Project Dashboard</h1>
            <h2>Good Morning,  Nishant</h2>
            <h4>{tasks.length} tasks due this week</h4>
        </div>

        <div className="categories pl-10 flex items-center gap-3 border-y py-1 px-2">
            {categories.map((c)=>(
                <button className='px-2 rounded-lg border text-sm'>{c}</button>
            ))}
        </div>

        <TaskList tasks={tasks} />
    </main>
  )
}

export default Dashboard