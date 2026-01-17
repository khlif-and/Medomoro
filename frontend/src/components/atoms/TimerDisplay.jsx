import React from 'react';

export const TimerDisplay = ({ timeLeft, mode }) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Dynamic color based on mode
    const getColor = () => {
        switch (mode) {
            case 'focus': return 'text-gray-900';
            case 'short': return 'text-green-600';
            case 'long': return 'text-blue-600';
            default: return 'text-gray-900';
        }
    };

    return (
        <div className={`text-[120px] font-bold leading-none tracking-tighter ${getColor()} transition-colors duration-500`}>
            {timeStr}
        </div>
    );
};
