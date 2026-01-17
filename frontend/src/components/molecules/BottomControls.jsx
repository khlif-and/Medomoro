import React from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';

export const BottomControls = ({ isActive, onToggle, onReset, onSettings }) => {
    return (
        <div className="flex items-center gap-8 mt-16">
            <button
                onClick={onReset}
                className="w-14 h-14 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-200 transition-all hover:-translate-y-1"
            >
                <RotateCcw size={20} />
            </button>

            <button
                onClick={onToggle}
                className="w-20 h-20 bg-amber-400 rounded-[2rem] shadow-xl shadow-amber-100 flex items-center justify-center text-white hover:bg-amber-500 transition-all hover:scale-105 active:scale-95"
            >
                {isActive ? (
                    <Pause size={32} fill="currentColor" strokeWidth={0} />
                ) : (
                    <Play size={32} fill="currentColor" strokeWidth={0} className="ml-1" />
                )}
            </button>

            <button
                onClick={onSettings}
                className="w-14 h-14 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-200 transition-all hover:-translate-y-1"
            >
                <Settings size={20} />
            </button>
        </div>
    );
};
