import { useEffect } from 'react';
import { useTasks } from '../hooks/useTasks';

export const useOnboardingPanel = () => {
    const { tasks, refreshTasks } = useTasks();

    useEffect(() => {
        refreshTasks();
    }, []);

    const pendingTasks = tasks.filter(t => !t.isDone);
    const displayedTasks = pendingTasks.slice(0, 8);
    const pendingCount = pendingTasks.length;

    return { displayedTasks, pendingCount };
};
