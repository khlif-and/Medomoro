import React from 'react';
import { Card } from '../atoms/Card';
import { Heading, Text } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { Plus, Trash2, Edit2, CheckCircle, Circle, Clock } from 'lucide-react';
import { useTaskPage } from '../../logic/useTaskPage';

export const TaskPage = () => {
    const {
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
    } = useTaskPage();

    return (
        <div className="flex flex-col gap-6 h-full">
            {/* Header: Clock & Date */}
            <div className="flex justify-between items-end">
                <div>
                    <Heading level={1} className="text-4xl font-light text-gray-900">Tasks</Heading>
                    <Text className="text-gray-500">Manage your daily goals</Text>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-mono font-bold text-[#1b2636] flex items-center gap-2 justify-end">
                        <Clock size={24} className="text-emerald-500" />
                        {formatTime()}
                    </div>
                    <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">{formatDate()}</div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8 h-full">
                {/* Left: Input Form */}
                <div className="col-span-12 lg:col-span-4">
                    <Card className="p-6 bg-white border border-gray-100 shadow-sm sticky top-6">
                        <Heading level={3} className="text-xl mb-4 flex items-center gap-2">
                            {isEditing ? <Edit2 size={18} /> : <Plus size={18} />}
                            {isEditing ? 'Edit Task' : 'New Task'}
                        </Heading>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Title</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2636]/20 transition-all font-medium"
                                    placeholder="What needs to be done?"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Description</label>
                                <textarea
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2636]/20 transition-all h-32 resize-none"
                                    placeholder="Add details..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 pt-2">
                                <Button type="submit" className="flex-1 bg-[#1b2636] text-white hover:bg-[#2c3e50]">
                                    {isEditing ? 'Update Task' : 'Add Task'}
                                </Button>
                                {isEditing && (
                                    <Button type="button" onClick={handleCancel} variant="ghost" className="text-gray-500">
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Right: Task List */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-4 overflow-y-auto pb-10 pr-2 custom-scrollbar">
                    {loading ? (
                        <div className="text-center py-20 text-gray-400">Loading tasks...</div>
                    ) : tasks.length === 0 ? (
                        <div className="text-center py-20 flex flex-col items-center gap-3">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                <CheckCircle size={32} className="text-gray-300" />
                            </div>
                            <Text className="text-gray-400">No tasks yet. Start by adding one!</Text>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className={`group relative bg-white rounded-2xl p-5 border transition-all duration-200 hover:shadow-md ${task.isDone ? 'border-emerald-100 bg-emerald-50/30' : 'border-gray-100'
                                    }`}
                            >
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => toggleDone(task)}
                                        className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.isDone ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 hover:border-emerald-400'
                                            }`}
                                    >
                                        {task.isDone && <CheckCircle size={14} className="text-white" />}
                                    </button>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className={`text-lg font-semibold transition-all ${task.isDone ? 'text-gray-400 line-through decoration-2 decoration-emerald-200' : 'text-gray-900'
                                                }`}>
                                                {task.title}
                                            </h4>
                                            <div className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-full font-mono">
                                                {task.createdAt.split(' ')[0]}
                                            </div>
                                        </div>
                                        <p className={`mt-1 text-sm ${task.isDone ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                                            {task.content}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions - visible on hover */}
                                <div className="absolute top-4 right-14 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                    <button
                                        onClick={() => handleEdit(task)}
                                        className="p-2 bg-white border border-gray-200 shadow-sm rounded-lg text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-colors"
                                        title="Edit"
                                        disabled={task.isDone} // Disable edit if done, optionally
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <button
                                        onClick={() => remove(task.id)}
                                        className="p-2 bg-white border border-gray-200 shadow-sm rounded-lg text-gray-500 hover:text-red-600 hover:border-red-200 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
