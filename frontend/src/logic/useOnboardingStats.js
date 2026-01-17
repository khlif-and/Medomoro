import { useEffect, useMemo } from 'react';
import { useTasks } from '../hooks/useTasks';

export const useOnboardingStats = () => {
    const { tasks, refreshTasks } = useTasks();

    useEffect(() => {
        refreshTasks();
    }, []);

    const stats = useMemo(() => {
        // Filter out Holidays as they are not "Tasks"
        const validTasks = tasks.filter(t => !t.isHoliday);

        const total = validTasks.length;
        const completed = validTasks.filter(t => t.isDone).length;
        const pending = total - completed;
        const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

        return { total, completed, pending, percentage };
    }, [tasks]);

    const data = [
        { name: 'Completed', value: stats.completed, color: '#10b981' },
        { name: 'Pending', value: stats.pending, color: '#6b7280' },
    ];

    return { stats, data };
};
