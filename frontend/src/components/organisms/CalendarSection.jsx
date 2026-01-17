import React from 'react';
import { Card } from '../atoms/Card';
import { Heading, Text } from '../atoms/Typography';
import { ChevronLeft, ChevronRight, Calendar as CalIcon } from 'lucide-react';
import { useCalendarLogic } from '../../logic/useCalendarLogic';
import { useNavigate } from 'react-router-dom';

export const CalendarSection = () => {
    const {
        currentDate,
        calendarDays,
        nextMonth,
        prevMonth,
        getDateColorClass,
        goToToday,
        selectedDate
    } = useCalendarLogic();

    const navigate = useNavigate();

    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // Formatting
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    const handleDayClick = () => {
        navigate('/calendar');
    };

    return (
        <Card className="w-full bg-white flex flex-col p-6 h-full min-h-[320px]">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-orange-50 p-2 rounded-lg">
                        <CalIcon size={20} className="text-orange-500" />
                    </div>
                    <div>
                        <Heading level={3} className="text-lg font-bold text-gray-900">{monthName} {year}</Heading>
                        <Text className="text-xs text-gray-400 font-medium">Schedule Overview</Text>
                    </div>
                </div>
                <div className="flex gap-1">
                    <button onClick={prevMonth} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                        <ChevronLeft size={18} />
                    </button>
                    <button onClick={nextMonth} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 flex flex-col">
                {/* Week Headers */}
                <div className="grid grid-cols-7 mb-2">
                    {weekDays.map(day => (
                        <div key={day} className="text-center text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 gap-y-2 flex-1">
                    {calendarDays.map((date, idx) => {
                        if (!date) return <div key={idx} />;

                        // Check logic
                        const colorClass = getDateColorClass(date);
                        // Simplified class for Dashboard Mini View:
                        // We might want less aggressive colors than the full calendar
                        // But let's use the logic for consistency, maybe tweak styles slightly

                        const dayNum = date.getDate();
                        const isToday = new Date().toDateString() === date.toDateString();

                        // Extract base color style but customize for mini widget if needed
                        // For now use standard classes but ensure they look good small

                        return (
                            <div key={idx} className="flex justify-center items-center">
                                <button
                                    onClick={handleDayClick}
                                    className={`
                                        w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all
                                        ${colorClass}
                                        ${!colorClass.includes('bg-') && 'hover:bg-gray-50 text-gray-600'}
                                    `}
                                >
                                    {dayNum}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer / Legend or Action */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center cursor-pointer" onClick={() => navigate('/calendar')}>
                <div className="flex -space-x-2">
                    {/* Dummy Avatars or Event Types */}
                    <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] text-blue-600 font-bold">W</div>
                    <div className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[10px] text-indigo-600 font-bold">P</div>
                    <div className="w-6 h-6 rounded-full bg-rose-100 border-2 border-white flex items-center justify-center text-[10px] text-rose-600 font-bold">+</div>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-gray-800 transition-colors">
                    <span>Open Calendar</span>
                    <ChevronRight size={14} />
                </div>
            </div>
        </Card>
    );
};
