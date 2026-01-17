import React from 'react';
import { Pause, Play, Maximize2, X, Minus } from 'lucide-react';

const MiniTimerView = ({ time, isRunning, onToggle, onExpand, mode }) => {
    const formatTime = (seconds) => {
        if (seconds === undefined || seconds === null) return "00:00";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const getModeLabel = () => {
        if (mode === 'focus') return 'POMODORO';
        if (mode === 'short' || mode === 'shortBreak') return 'SHORT BREAK';
        if (mode === 'long' || mode === 'longBreak') return 'LONG BREAK';
        return 'POMODORO';
    };

    const handleClose = async () => {
        try {
            if (window.go && window.go.main && window.go.main.App) {
                await window.go.main.App.CloseWindow();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleMinimizeReal = async () => {
        try {
            if (window.go && window.go.main && window.go.main.App) {
                await window.go.main.App.MinimizeWindow();
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div
            className="w-full h-full bg-[#F9F8F4] flex flex-col items-center justify-center select-none relative overflow-hidden border-2 border-gray-200 group"
            style={{ '--wails-draggable': 'drag' }}
        >
            {/* Background Accent */}
            <div className={`absolute top-0 w-full h-1.5 ${mode === 'focus' ? 'bg-rose-500' : 'bg-emerald-500'
                }`}></div>

            {/* Window Controls Overlay */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ '--wails-draggable': 'no-drag' }}>
                <button
                    onClick={handleMinimizeReal}
                    className="w-6 h-6 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 transition-colors"
                    title="Minimize"
                >
                    <Minus size={14} />
                </button>
                <button
                    onClick={handleClose}
                    className="w-6 h-6 rounded-lg bg-gray-200 hover:bg-rose-500 flex items-center justify-center text-gray-600 hover:text-white transition-colors"
                    title="Close"
                >
                    <X size={14} />
                </button>
            </div>

            {/* Timer Display */}
            <div className={`text-6xl font-black tracking-tighter leading-none mt-2 ${mode === 'focus' ? 'text-rose-500' : 'text-emerald-500'
                }`}>
                {formatTime(time)}
            </div>

            <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.25em] mt-1 mb-4">
                {getModeLabel()}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3" style={{ '--wails-draggable': 'no-drag' }}>
                <button
                    onClick={onToggle}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 shadow-lg ${isRunning
                        ? 'bg-gray-800 text-white shadow-gray-200'
                        : (mode === 'focus' ? 'bg-rose-500 text-white shadow-rose-200' : 'bg-emerald-500 text-white shadow-emerald-200')
                        }`}
                >
                    {isRunning ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                </button>
                <button
                    onClick={onExpand}
                    className="w-10 h-10 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors text-gray-500 hover:text-gray-900 shadow-sm"
                    title="Expand"
                >
                    <Maximize2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default MiniTimerView;
