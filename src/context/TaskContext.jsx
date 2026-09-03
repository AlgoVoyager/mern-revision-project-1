import { createContext, useContext } from "react";
import { useTasks } from "../hooks/useTasks";
export const TaskContext = createContext();

const TaskProvider  = ({children}) =>{
    const taskValue  = useTasks();

    return (
        <TaskContext.Provider value={taskValue}>
            {children}
        </TaskContext.Provider>
    )
}
export default TaskProvider;