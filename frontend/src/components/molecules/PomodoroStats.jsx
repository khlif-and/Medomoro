import React, { useEffect, useState } from 'react';
import { Flame, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { usePomodoroStats } from '../../logic/usePomodoroStats';

export const PomodoroStats = ({ cycles }) => {
    const { getStats } = usePomodoroStats();
    const [data, setData] = useState({
        today: { focus_minutes: 0, sessions: 0 },
        global: { current_streak: 0 }
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await getStats();
            if (result) {
                setData(result);
            }
        };
        fetchData();
    }, [cycles]); // Refresh when cycles change (session completed)

    // Calculate hours and minutes
    const hours = Math.floor(data.today.focus_minutes / 60);
    const minutes = data.today.focus_minutes % 60;

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6 w-72 h-fit">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp size={16} className="text-gray-400" />
                Today's Stats
            </h3>

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                        <Flame size={20} fill="currentColor" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{data.global.current_streak}</div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">Day Streak</div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                        <Clock size={20} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{hours}h {minutes}m</div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">Focus Time</div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                        <CheckCircle size={20} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{data.today.sessions}</div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">Sessions</div>
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-50">
                <div className="text-xs text-center text-gray-400">
                    "Consistency is key to success."
                </div>
            </div>
        </div>
    );
};
