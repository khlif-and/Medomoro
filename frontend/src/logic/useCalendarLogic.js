import { useState, useMemo } from 'react';
import { useTasks } from '../hooks/useTasks';

export const useCalendarLogic = () => {
    const { tasks, add, update, remove, loading, refreshTasks } = useTasks();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Calendar Navigation
    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToToday = () => {
        const today = new Date();
        setCurrentDate(today);
        setSelectedDate(today);
    };

    // Calendar Grid
    const calendarDays = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDayOfWeek = firstDay.getDay();

        const days = [];
        for (let i = 0; i < startDayOfWeek; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    }, [currentDate]);

    // Helpers
    const formatDateKey = (date) => {
        // Safe check for null date
        if (!date || !(date instanceof Date) || isNaN(date)) return "";
        // Proper timezone handling to avoid off-by-one errors often seen with ISOString slicing
        // Use local date string format YYYY-MM-DD
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - (offset * 60 * 1000));
        return localDate.toISOString().split('T')[0];
    };

    const selectedDateKey = formatDateKey(selectedDate);

    const dayTasks = useMemo(() => {
        return tasks.filter(task => task.scheduledDate === selectedDateKey && !task.isHoliday);
    }, [tasks, selectedDateKey]);

    const isHoliday = (date) => {
        const key = formatDateKey(date);
        return tasks.some(task => task.scheduledDate === key && task.isHoliday);
    };

    // Color Logic Helper
    const getDateColorClass = (date) => {
        if (!date) return "";
        const key = formatDateKey(date);
        const todayKey = formatDateKey(new Date());

        // 1. Holiday (Blue)
        if (isHoliday(date)) {
            return "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200";
        }

        // 2. Today (Yellow)
        if (key === todayKey) {
            return "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100";
        }

        // 3. Past Days Check
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        if (date < todayDate) {
            // Count completed ONLY regular tasks (ignore holidays)
            const tasksOnDate = tasks.filter(t => t.scheduledDate === key && !t.isHoliday);
            const completedCount = tasksOnDate.filter(t => t.isDone).length;

            if (tasksOnDate.length > 0) {
                if (completedCount >= 3) {
                    return "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"; // Success
                } else {
                    return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"; // Fail
                }
            }
        }

        // Default Future or Empty
        return "bg-white hover:bg-gray-50 text-gray-700 border-transparent hover:border-gray-100";
    };

    const addTaskToDate = async (title, content, time, color) => {
        return await add(title, content, selectedDateKey, time, color);
    };

    const toggleHoliday = async () => {
        try {
            if (window.go && window.go.controller && window.go.controller.TaskController && window.go.controller.TaskController.ToggleHoliday) {
                await window.go.controller.TaskController.ToggleHoliday(selectedDateKey);
                await refreshTasks();
            } else {
                console.error("ToggleHoliday binding not found. Ensure wails bindings are generated.");
            }
        } catch (e) {
            console.error("Failed to toggle holiday", e);
        }
    };

    // Check if current selected date is holiday
    const isSelectedHoliday = isHoliday(selectedDate);

    return {
        currentDate,
        selectedDate,
        setSelectedDate,
        nextMonth,
        prevMonth,
        goToToday,
        calendarDays,
        dayTasks,
        loading,
        formatDateKey,
        getDateColorClass,
        addTaskToDate,
        updateTask: update,
        deleteTask: remove,
        toggleHoliday,
        isSelectedHoliday
    };
};
