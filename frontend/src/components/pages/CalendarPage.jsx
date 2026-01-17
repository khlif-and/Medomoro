import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Plus, CheckCircle, Trash2, Shield, CalendarOff } from 'lucide-react';
import { Heading, Text } from '../atoms/Typography';
import { useCalendarLogic } from '../../logic/useCalendarLogic';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const COLORS = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Green', value: '#10b981' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Orange', value: '#f59e0b' },
];

const CalendarPage = () => {
    const {
        currentDate,
        selectedDate,
        setSelectedDate,
        nextMonth,
        prevMonth,
        goToToday,
        calendarDays,
        dayTasks,
        addTaskToDate,
        updateTask,
        deleteTask,
        getDateColorClass,
        formatDateKey,
        toggleHoliday,
        isSelectedHoliday
    } = useCalendarLogic();

    const [isAdding, setIsAdding] = useState(false);

    // Form State
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskContent, setNewTaskContent] = useState(""); // Description
    const [newTaskTime, setNewTaskTime] = useState("09:00");
    const [newTaskColor, setNewTaskColor] = useState(COLORS[0].value);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        await addTaskToDate(newTaskTitle, newTaskContent, newTaskTime, newTaskColor);
        setNewTaskTitle("");
        setNewTaskContent("");
        setIsAdding(false);
    };

    const isSelected = (date) => {
        if (!date) return false;
        return formatDateKey(date) === formatDateKey(selectedDate);
    };

    const isToday = (date) => {
        if (!date) return false;
        return formatDateKey(date) === formatDateKey(new Date());
    };

    return (
        <div className="flex h-full gap-8 overflow-hidden">
            {/* Left: Main Calendar */}
            <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Heading level={1} className="text-3xl font-bold text-gray-900">
                            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </Heading>
                        <Text muted>Visualize your productivity and schedule.</Text>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm border border-gray-100">
                        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={20} /></button>
                        <button onClick={goToToday} className="px-4 py-1 text-sm font-bold hover:bg-gray-100 rounded-full transition-colors">Today</button>
                        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight size={20} /></button>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex-1 flex flex-col">
                    <div className="grid grid-cols-7 mb-4">
                        {WEEKDAYS.map(day => (
                            <div key={day} className="text-center text-sm font-bold text-gray-400 uppercase tracking-wider py-4">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 flex-1 auto-rows-fr gap-y-2 gap-x-0 place-items-center">
                        {calendarDays.map((date, i) => (
                            <div key={i} className="relative w-12 h-12 flex items-center justify-center">
                                {date ? (
                                    <button
                                        onClick={() => setSelectedDate(date)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center relative transition-all duration-200 border-2
                                            ${isSelected(date)
                                                ? isToday(date)
                                                    ? 'bg-yellow-100 text-yellow-900 border-[#1b2636] ring-2 ring-[#1b2636]/20 font-bold shadow-md z-20' // Selected Today
                                                    : 'bg-[#1b2636] text-white border-[#1b2636] shadow-md z-20' // Selected Other
                                                : getDateColorClass(date) // Not Selected
                                            }
                                        `}
                                    >
                                        <span className="text-sm font-bold">
                                            {date.getDate()}
                                        </span>
                                    </button>
                                ) : (
                                    <div />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="flex gap-4 mt-6 justify-center text-xs font-bold text-gray-400">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-300"></div>Today</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-100 border border-green-300"></div>Goal Met (3+)</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-100 border border-red-300"></div>Goal Missed</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-100 border border-blue-300"></div>Day Off</div>
                    </div>
                </div>
            </div>

            {/* Right: Daily Schedule Side Panel */}
            <div className="w-[400px] flex flex-col gap-6 bg-white border-l border-gray-100 shadow-xl p-8 z-30 h-full overflow-hidden">
                <div className="flex items-center justify-between">
                    <div>
                        <Heading level={2} className="text-2xl font-bold text-gray-900">
                            {selectedDate.toLocaleString('default', { weekday: 'long' })}
                        </Heading>
                        <Text className="text-gray-500 font-medium">
                            {selectedDate.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                        </Text>
                    </div>

                    <button
                        onClick={toggleHoliday}
                        className={`p-3 rounded-xl transition-all ${isSelectedHoliday ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                        title="Toggle Day Off"
                    >
                        <CalendarOff size={20} />
                    </button>
                </div>

                {isSelectedHoliday ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-blue-50/50 rounded-3xl border-2 border-dashed border-blue-100">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-blue-500">
                            <CalendarOff size={32} />
                        </div>
                        <Heading level={2} className="text-blue-900 mb-2">Day Off</Heading>
                        <Text className="text-blue-600/70">Enjoy your break! No tasks needed today.</Text>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                            {dayTasks.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-40 text-center gap-4 border-2 border-dashed border-gray-100 rounded-2xl mt-4">
                                    <CalendarIcon size={32} className="text-gray-300" />
                                    <Text muted>No tasks scheduled.</Text>
                                </div>
                            ) : (
                                dayTasks
                                    .sort((a, b) => (a.scheduledTime || "").localeCompare(b.scheduledTime || ""))
                                    .map(task => (
                                        <div
                                            key={task.id}
                                            className={`group p-4 rounded-2xl border transition-all duration-200 
                                            ${task.isDone ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'}
                                        `}
                                            style={{ borderLeftWidth: '4px', borderLeftColor: task.color || '#e5e7eb' }}
                                        >
                                            <div className="flex items-start gap-3">
                                                <button
                                                    onClick={() => updateTask({ ...task, isDone: !task.isDone })}
                                                    className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                                                    ${task.isDone ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 hover:border-emerald-500'}
                                                `}
                                                >
                                                    {task.isDone && <CheckCircle size={10} className="text-white" />}
                                                </button>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className={`text-base font-bold truncate ${task.isDone ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                                                            {task.title}
                                                        </h4>
                                                        <button
                                                            onClick={() => deleteTask(task.id)}
                                                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                    <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">{task.content}</p>
                                                    {task.scheduledTime && (
                                                        <div className="flex items-center gap-1 mt-2 text-xs font-bold text-gray-400 bg-gray-50 w-fit px-2 py-1 rounded-md">
                                                            <Clock size={12} />
                                                            {task.scheduledTime}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            {isAdding ? (
                                <form onSubmit={handleAddTask} className="flex flex-col gap-3 animate-in slide-in-from-bottom-2">
                                    <input
                                        autoFocus
                                        placeholder="Task title..."
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold"
                                        value={newTaskTitle}
                                        onChange={e => setNewTaskTitle(e.target.value)}
                                        required
                                    />
                                    <textarea
                                        placeholder="Description (optional)..."
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none h-20"
                                        value={newTaskContent}
                                        onChange={e => setNewTaskContent(e.target.value)}
                                    />
                                    <div className="flex gap-2">
                                        <input
                                            type="time"
                                            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold"
                                            value={newTaskTime}
                                            onChange={e => setNewTaskTime(e.target.value)}
                                        />
                                        <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-2">
                                            {COLORS.map(c => (
                                                <button
                                                    key={c.value}
                                                    type="button"
                                                    onClick={() => setNewTaskColor(c.value)}
                                                    className={`w-5 h-5 rounded-full transition-transform hover:scale-110 ${newTaskColor === c.value ? 'ring-2 ring-offset-1 ring-gray-400' : ''}`}
                                                    style={{ backgroundColor: c.value }}
                                                    title={c.name}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-1">
                                        <button type="submit" className="flex-1 bg-black text-white font-bold py-2 rounded-xl text-sm shadow-lg hover:bg-gray-800">Save</button>
                                        <button type="button" onClick={() => setIsAdding(false)} className="px-4 bg-gray-100 text-gray-600 font-bold py-2 rounded-xl text-sm hover:bg-gray-200">Cancel</button>
                                    </div>
                                </form>
                            ) : (
                                <button
                                    onClick={() => setIsAdding(true)}
                                    className="w-full py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-black/20 hover:shadow-xl hover:-translate-y-1 transition-all"
                                >
                                    <Plus size={20} />
                                    Add Task
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CalendarPage;
