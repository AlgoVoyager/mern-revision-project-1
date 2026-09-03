import { useEffect, useRef, useState } from "react";
import { MAX_TASKS, TASK_STATUSES } from "../constants/taskConstants";
export const useTasks = () => {
    const [tasks, setTasks] = useState(()=>{
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks?JSON.parse(storedTasks):[];
      })

      const [deletedTaskIds, setDeletedTaskIds] = useState([]);
      const timersRef = useRef({});
      
      const isTaskLimitReached = tasks.length >= MAX_TASKS;

    useEffect(()=>{
        localStorage.setItem('tasks',JSON.stringify(tasks));
    },[tasks])

    const onAddTask  = (newTask)=>{
        if(isTaskLimitReached) return alert("maximum tasks limit reached.")
        setTasks(p=>[...p,newTask])
    }
    const onEditTask = (updatedTask) => {
        setTasks(p=>p.map(t=>t.id===updatedTask.id?updatedTask:t))
    }
    const onStatusChange = (id) => {
        const task = tasks.find(t=>t.id==id);
        const statusIndex = TASK_STATUSES.findIndex(s=>s==task.status);
        const nextIndex = (statusIndex+1)%TASK_STATUSES.length;
        setTasks(p=>p.map(t=>{
        if(t.id===id) return{
            ...t, status: TASK_STATUSES[nextIndex]
        }
        else return t
        }))
    }
    const onDeleteTask = (id)=>{
        setDeletedTaskIds(p=>[...p,id]);
        timersRef.current[id] = setTimeout(() => {
        setTasks(p=>p.filter(t=>t.id!==id))
        setDeletedTaskIds(p=>p.filter(t=>t!==id))
        delete timersRef.current[id];
        }, 5000);
    }
    const onUndoDelete = (id)=>{
        clearTimeout(timersRef.current[id]);
        setDeletedTaskIds(p=>p.filter(i=>i!==id))
        delete timersRef.current[id];
    }
};