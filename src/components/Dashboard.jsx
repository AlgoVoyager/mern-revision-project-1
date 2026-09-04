import React, { useState } from 'react'
import TaskList from './tasks/TaskList';
import TaskForm from './tasks/TaskForm';
import SearchTask from './tasks/SearchTask';
import DeleteNotifications from './tasks/DeleteNotifications';
import TaskListFooter from './tasks/TaskListFooter';
import {useTaskContext} from '../context/TaskContext'
import { TASK_CATEGORIES } from '../constants/taskConstants';

const Dashboard = () => {
    const {tasks, deletedTaskIds} = useTaskContext()
    const stats = tasks.reduce((acc, task) => {
        acc[task.status]++;
        return acc;
    }, {
        Todo: 0,
        "In Progress": 0,
        Done: 0
    });
    const completionPercentage =
    tasks.length > 0
        ? Math.round((stats.Done / tasks.length) * 100)
        : 0;
    const [searchTerm, setsearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const filteredTasks = tasks.filter(t => {
        const categoryMatches = selectedCategory === "All"
            || t.status === selectedCategory;
        const searchMatches = t.title.toLowerCase().includes(searchTerm.toLowerCase());
        const notDeleting = !deletedTaskIds.includes(t.id);
        return categoryMatches && searchMatches && notDeleting;
    })
    const tasksLength = tasks.length;
    const filteredLength = filteredTasks.length;

    const priorityOrder = {
        High: 3,
        Medium: 2,
        Low: 1
    }
    const [sortBy, setSortBy] = useState("Newest")
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortBy === "Newest") {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }

        if (sortBy === "Oldest") {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }

        return priorityOrder[b.priority] - priorityOrder[a.priority];
    });


    const [editingTask, setEditingTask] = useState(null)
    const onEditingTask = (task) => {
        setEditingTask(task)
    }
    const onCancelEdit = () => setEditingTask(null);
    const onSearchChange = (e) => {
        e.preventDefault()
        setsearchTerm(e.target.value);
    }
    return (
        <main className='py-1 w-full'>
            <div className="dashboard-hero flex justify-between mb-10 px-10">
                <div className="info-left w-1/2">
                    <h1 className='my-10'>Project Dashboard</h1>
                    <h2>Good Morning,  Nishant</h2>
                </div>
                <div className="info-right w-1/2 flex flex-wrap gap-5 items-center justify-end">
                    <div className="info-card-primary">
                        <h3 className="info-value">{tasks.length}</h3>
                        <p className="info-des">Total Tasks</p>
                    </div>
                    <div className="info-card-success">
                        <h3 className="info-value">{completionPercentage}%</h3>
                        <p className="info-des">Completed</p>
                    </div>
                </div>
            </div>

            <TaskForm editingTask={editingTask} onCancelEdit={onCancelEdit}/>

            <div className="filter-bar pl-10 flex justify-between items-center gap-3 border-y py-1 px-2">
                <div className="categories  flex justify-between items-center gap-3">
                    {TASK_CATEGORIES.map((c) => (
                        <button onClick={() => setSelectedCategory(c)} key={c}
                            className={`px-2 rounded-lg border text-sm ${c === selectedCategory && 'bg-gray-700 text-white'}`}>{c} ({c !== 'All' ? stats[c] : tasks.length})</button>
                    ))}
                </div>
                <SearchTask searchTerm={searchTerm} onSearchChange={onSearchChange} />
                <select name="sorting" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='px-2 rounded-lg border text-sm'>
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                    <option value="Priority">Priority</option>
                </select>
            </div>
            <DeleteNotifications />
            <TaskList tasks={sortedTasks} onEditingTask={onEditingTask}/>
            <TaskListFooter tasksLength={tasksLength} filteredLength={filteredLength} />
        </main>
    )
}


export default Dashboard