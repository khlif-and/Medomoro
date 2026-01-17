import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useClock } from '../hooks/useClock';

export const useTaskPage = () => {
    const { time, formatTime, formatDate } = useClock();
    const { tasks, loading, add, update, remove } = useTasks();

    // Form state
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        if (isEditing) {
            const taskToUpdate = tasks.find(t => t.id === editId);
            if (taskToUpdate) {
                await update({ ...taskToUpdate, title, content });
            }
            setIsEditing(false);
            setEditId(null);
        } else {
            await add(title, content);
        }
        setTitle("");
        setContent("");
    };

    const handleEdit = (task) => {
        setTitle(task.title);
        setContent(task.content);
        setIsEditing(true);
        setEditId(task.id);
    };

    const handleCancel = () => {
        setTitle("");
        setContent("");
        setIsEditing(false);
        setEditId(null);
    };

    const toggleDone = async (task) => {
        await update({ ...task, isDone: !task.isDone });
    };

    return {
        time,
        formatTime,
        formatDate,
        tasks,
        loading,
        title,
        setTitle,
        content,
        setContent,
        isEditing,
        handleSubmit,
        handleEdit,
        handleCancel,
        toggleDone,
        remove
    };
};
