import React from 'react';
import { Card } from '../atoms/Card';
import { Heading, Text } from '../atoms/Typography';
import { ArrowUpRight, Play, Pause, Clock } from 'lucide-react';
import { Button } from '../atoms/Button';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const TimeTracker = () => {
    const data = [
        { name: 'Elapsed', value: 70 },
        { name: 'Remaining', value: 30 },
    ];
    const COLORS = ['#FCD34D', '#F3F4F6'];

    return (
        <Card className="flex flex-col h-full bg-white">
            <div className="flex justify-between items-start mb-4">
                <Heading level={3} className="text-xl font-medium text-gray-800">Time tracker</Heading>
                <Button variant="ghost" className="bg-gray-50 p-2 rounded-full w-8 h-8 flex items-center justify-center">
                    <ArrowUpRight size={16} />
                </Button>
            </div>

            <div className="flex-1 relative flex items-center justify-center">
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
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-light text-gray-900">02:35</span>
                        <span className="text-xs text-gray-400 font-medium tracking-wide">Work Time</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="flex gap-2">
                    <Button variant="ghost" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center pl-3">
                        <Play size={16} fill="black" className="text-black" />
                    </Button>
                    <Button variant="ghost" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center">
                        <Pause size={16} fill="black" className="text-black" />
                    </Button>
                </div>
                <Button variant="dark" className="w-10 h-10 rounded-full bg-[#2D2D2D] flex items-center justify-center p-0">
                    <Clock size={16} className="text-white" />
                </Button>
            </div>

        </Card>
    );
};
