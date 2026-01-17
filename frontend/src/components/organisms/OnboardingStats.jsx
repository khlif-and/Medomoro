import React from 'react';
import { Card } from '../atoms/Card';
import { Heading } from '../atoms/Typography';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useOnboardingStats } from '../../logic/useOnboardingStats';

export const OnboardingStats = () => {
    const { stats, data } = useOnboardingStats();

    return (
        <Card className="bg-[#2D2D2D] text-white p-6 h-fit" dark>
            <div className="mb-6">
                <Heading level={4} className="text-lg font-normal text-white">Task Progress</Heading>
                <p className="text-white/50 text-xs mt-1">overview of your onboarding journey</p>
            </div>

            <div className="h-[180px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1f2937',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '12px'
                            }}
                            itemStyle={{ color: 'white' }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-3xl font-bold text-white">{stats.percentage}%</span>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest">Done</p>
                </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
                {data.map((item) => (
                    <div key={item.name} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium text-white">
                            {stats.total > 0 ? Math.round((item.value / stats.total) * 100) : 0}%
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    );
};
