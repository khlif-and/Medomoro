import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export const TimerControls = ({ isActive, onToggle, onReset }) => {
    return (
        <div className="flex items-center gap-4 mt-8">
            <button
                onClick={onReset}
                className="p-4 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
                <RotateCcw size={24} />
            </button>
            <button
                onClick={onToggle}
                className="group relative flex items-center justify-center w-20 h-20 bg-black text-white rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-2xl"
            >
                {isActive ?
                    <Pause size={32} fill="currentColor" className="text-white" /> :
                    <Play size={32} fill="currentColor" className="text-white ml-1" />
                }
            </button>
        </div>
    );
};
