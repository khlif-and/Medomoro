import React from 'react';
import { Card } from '../atoms/Card';
import { Heading, Text } from '../atoms/Typography';
import { Badge } from '../atoms/Badge';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../atoms/Button';
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis } from 'recharts';

export const ProgressSection = () => {
    const data = [
        { name: 'S', val: 30 },
        { name: 'M', val: 50 },
        { name: 'T', val: 40 },
        { name: 'W', val: 70 },
        { name: 'T', val: 50 },
        { name: 'F', val: 80 }, // Active
        { name: 'S', val: 40 },
    ];

    return (
        <Card className="flex flex-col h-full bg-white relative">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <Heading level={3} className="text-xl font-medium text-gray-800">Progress</Heading>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-4xl font-light text-gray-900">6.1 h</span>
                        <span className="text-xs text-gray-500 font-medium">Work Time<br />this week</span>
                    </div>
                </div>
                <Button variant="ghost" className="bg-gray-50 p-2 rounded-full w-8 h-8 flex items-center justify-center">
                    <ArrowUpRight size={16} />
                </Button>
            </div>

            <div className="flex-1 w-full relative">
                {/* Floating badge for active bar */}
                <div className="absolute top-0 right-10 z-10">
                    <Badge variant="yellow" className="shadow-sm font-medium py-1 px-3">5h 23m</Badge>
                </div>

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                        <Bar dataKey="val" radius={[10, 10, 10, 10]} barSize={8}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.name === 'F' ? '#FCD34D' : '#1F2937'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};
