import { createContext, useContext, useState } from "react";
import { createTaskRequest, deleteTaskRequest, getTaskRequestById, getTasksRequest, updateTaskRequest } from '../api/task';

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }

    return context;
}

export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            //console.log(res);
            setTasks(res.data); 
        } catch (error) {
            console.log(error);
        }
        // const res = await getTasksRequest();
        // console.log(res);
    }

    const createTask = async (task) => {
        const res = await createTaskRequest(task);
        //console.log(res);
    }

    const getTaskById = async (id) => {
        try {
            const res = await getTaskRequestById(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateTask = async (id, task) => {
        try {
            await updateTaskRequest(id, task);
        } catch (error) {
            console.log(error);
        }
    }
    
    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            if(res.status === 204) setTasks(tasks.filter((task) => task._id !== id))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TaskContext.Provider 
        value={
            {
                tasks,
                createTask,
                getTasks,
                getTaskById,
                updateTask,
                deleteTask
            }
        }>
            {children}
        </TaskContext.Provider>
    )
}