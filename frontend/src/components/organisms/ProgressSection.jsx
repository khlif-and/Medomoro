import React from 'react';
import { Card } from '../atoms/Card';
import { Heading, Text } from '../atoms/Typography';
import { Badge } from '../atoms/Badge';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../atoms/Button';
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis } from 'recharts';

export const ProgressSection = () => {
    const [stats, setStats] = React.useState({
        week: [],
        highlight: 0,
        totalWeekHours: 0
    });

    // Use controller directly via window.go if available, or just mock for now until rebuilt
    // Ideally use usePomodoroStats hook but we need useEffect

    const fetchStats = async () => {
        try {
            if (window.go && window.go.controller && window.go.controller.PomodoroController) {
                const data = await window.go.controller.PomodoroController.GetPomodoroData();
                if (data && data.week) {
                    processData(data.week);
                }
            }
        } catch (e) {
            console.error("Failed to fetch stats", e);
        }
    };

    const processData = (weekData) => {
        const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; // Should match date
        // backend returns YYYY-MM-DD

        const chartData = weekData.map(day => {
            const date = new Date(day.date);
            return {
                name: days[date.getDay()], // 0 = Sun
                val: day.focusMinutes || 0,
                fullDate: day.date
            };
        });

        const totalMinutes = weekData.reduce((acc, curr) => acc + (curr.focusMinutes || 0), 0);

        // Find today's index (last one)
        const todayIndex = chartData.length - 1;

        setStats({
            week: chartData,
            highlight: todayIndex,
            totalWeekHours: (totalMinutes / 60).toFixed(1),
            todayMinutes: weekData[todayIndex]?.focusMinutes || 0
        });
    };

    React.useEffect(() => {
        fetchStats();
        // Poll every minute to keep updated? Or listen to events?
        // For now fetch once + interval
        const interval = setInterval(fetchStats, 60000);
        return () => clearInterval(interval);
    }, []);

    const todayHours = (stats.todayMinutes / 60).toFixed(1);

    return (
        <Card className="flex flex-col h-full bg-white relative">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <Heading level={3} className="text-xl font-medium text-gray-800">Progress</Heading>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-4xl font-light text-gray-900">{todayHours} h</span>
                        <span className="text-xs text-gray-500 font-medium">Focused<br />Today</span>
                    </div>
                </div>
                <Button variant="ghost" className="bg-gray-50 p-2 rounded-full w-8 h-8 flex items-center justify-center">
                    <ArrowUpRight size={16} />
                </Button>
            </div>

            <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.week.length > 0 ? stats.week : []}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                        <Bar dataKey="val" radius={[10, 10, 10, 10]} barSize={8}>
                            {stats.week.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === stats.highlight ? '#FCD34D' : '#1F2937'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};
