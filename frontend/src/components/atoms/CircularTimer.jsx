import React from 'react';

export const CircularTimer = ({ timeLeft, mode, totalTime }) => {
    // Calculate progress (1 to 0)
    const progress = timeLeft / totalTime;

    // SVG Config
    const size = 320;
    const strokeWidth = 12;
    const center = size / 2;
    const radius = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress * circumference);

    const getColors = () => {
        switch (mode) {
            case 'focus': return { path: 'text-red-500', track: 'text-gray-100' };
            case 'short': return { path: 'text-teal-500', track: 'text-gray-100' };
            case 'long': return { path: 'text-blue-500', track: 'text-gray-100' };
            default: return { path: 'text-gray-900', track: 'text-gray-100' };
        }
    };

    const colors = getColors();

    // Format Time
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return (
        <div className="relative flex items-center justify-center">
            {/* SVG Ring */}
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Track */}
                <circle
                    className={colors.track}
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={center}
                    cy={center}
                />
                {/* Progress */}
                <circle
                    className={`${colors.path} transition-all duration-1000 ease-linear`}
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    r={radius}
                    cx={center}
                    cy={center}
                />
            </svg>

            {/* Content Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="text-[64px] font-bold text-gray-800 leading-none tracking-tight font-mono">
                    {timeStr}
                </div>
                <div className="text-sm font-bold tracking-[0.2em] text-gray-400 mt-2 uppercas">
                    {progress < 1 ? 'RUNNING' : 'READY'}
                </div>
            </div>
        </div>
    );
};
