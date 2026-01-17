import React from 'react';
import { Card } from '../atoms/Card';
import { Heading, Text } from '../atoms/Typography';
import { ArrowUpRight, Play, Pause, Clock } from 'lucide-react';
import { Button } from '../atoms/Button';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { usePomodoroContext } from '../../context/PomodoroContext';
import { useNavigate } from 'react-router-dom';

export const TimeTracker = () => {
    const { timeLeft, isActive, toggleTimer, mode, settings } = usePomodoroContext();
    const navigate = useNavigate();

    // Calculate total duration based on mode for chart
    let totalDuration = 25 * 60;
    switch (mode) {
        case 'focus': totalDuration = settings.focusDuration * 60; break;
        case 'short': totalDuration = settings.shortBreakDuration * 60; break;
        case 'long': totalDuration = settings.longBreakDuration * 60; break;
        default: totalDuration = 25 * 60;
    }

    const elapsed = totalDuration - timeLeft;
    const progress = (elapsed / totalDuration) * 100;

    const data = [
        { name: 'Elapsed', value: elapsed },
        { name: 'Remaining', value: timeLeft },
    ];

    // Colors based on mode
    const activeColor = mode === 'focus' ? '#ef4444' : '#10b981'; // Rose-500 or Emerald-500
    const COLORS = [activeColor, '#F3F4F6'];

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const getModeLabel = () => {
        if (mode === 'focus') return 'Focus Time';
        if (mode === 'short') return 'Short Break';
        if (mode === 'long') return 'Long Break';
        return 'Timer';
    };

    const handleCardClick = () => {
        navigate('/pomodoro');
    };

    const handleToggle = (e) => {
        e.stopPropagation();
        toggleTimer();
    };

    return (
        <Card
            className="flex flex-col h-full bg-white cursor-pointer hover:shadow-md transition-shadow"
            onClick={handleCardClick}
        >
            <div className="flex justify-between items-start mb-4">
                <Heading level={3} className="text-xl font-medium text-gray-800">Time tracker</Heading>
                <Button
                    variant="ghost"
                    className="bg-gray-50 p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                >
                    <ArrowUpRight size={16} />
                </Button>
            </div>

            <div className="flex-1 relative flex items-center justify-center pointer-events-none">
                {/* Chart */}
                <div className="w-48 h-48 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={70}
                                startAngle={90}
                                endAngle={-270}
                                paddingAngle={0}
                                dataKey="value"
                                stroke="none"
                                cornerRadius={10}
                                isAnimationActive={false}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-4xl font-black tracking-tighter ${mode === 'focus' ? 'text-rose-500' : 'text-emerald-500'}`}>
                            {formatTime(timeLeft)}
                        </span>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
                            {getModeLabel()}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="flex gap-2">
                    <button
                        onClick={handleToggle}
                        className={`w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center transition-all ${isActive ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white hover:bg-gray-50 text-gray-900'
                            }`}
                    >
                        {isActive ? (
                            <Pause size={20} color="white" />
                        ) : (
                            <Play size={20} color="black" className="ml-1" />
                        )}
                    </button>
                </div>
                <Button
                    variant="dark"
                    className="w-10 h-10 rounded-full bg-[#2D2D2D] flex items-center justify-center p-0 hover:bg-black transition-colors"
                >
                    <Clock size={16} className="text-white" />
                </Button>
            </div>

        </Card>
    );
};
