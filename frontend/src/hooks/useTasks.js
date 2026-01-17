import { useState, useEffect } from 'react';
import { GetTasks, AddTask, UpdateTask, DeleteTask } from '../../wailsjs/go/controller/TaskController';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const refreshTasks = async () => {
        try {
            setLoading(true);
            const result = await GetTasks();
            setTasks(result || []); // Handle null return
        } catch (err) {
            console.error("Failed to fetch tasks:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshTasks();
    }, []);

    const add = async (title, content) => {
        try {
            await AddTask(title, content);
            await refreshTasks();
            return true;
        } catch (err) {
            console.error("Failed to add task:", err);
            return false;
        }
    };

    const update = async (task) => {
        try {
            await UpdateTask(task);
            await refreshTasks();
            return true;
        } catch (err) {
            console.error("Failed to update task:", err);
            return false;
        }
    };

    const remove = async (id) => {
        try {
            await DeleteTask(id);
            await refreshTasks();
            return true;
        } catch (err) {
            console.error("Failed to delete task:", err);
            return false;
        }
    };

    return { tasks, loading, add, update, remove, refreshTasks };
};
