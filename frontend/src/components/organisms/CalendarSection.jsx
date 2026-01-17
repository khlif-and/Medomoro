import React from 'react';
import { Card } from '../atoms/Card';
import { Heading, Text } from '../atoms/Typography';

export const CalendarSection = () => {
    return (
        <Card className="w-full bg-[#FFFBF4] border border-[#FDF6E8] flex flex-col gap-6 py-8">
            <div className="flex justify-between items-center px-4">
                <Badge variant="outline" className="bg-white border-none py-1 px-3 text-xs font-medium text-gray-500">August</Badge>
                <Heading level={3} className="text-lg font-medium text-gray-800">September 2024</Heading>
                <Badge variant="white" className="bg-white py-1 px-3 text-xs font-medium text-gray-500 rounded-full shadow-sm">October</Badge>
            </div>

            <div className="flex justify-between items-start relative px-6">
                {/* Timeline Line - Visual only (simplified) */}
                <div className="absolute top-12 left-0 right-0 h-px bg-gray-200/50 border-t border-dashed border-gray-300 mx-8 z-0"></div>

                {/* Day Items */}
                {[
                    { day: 'Mon', date: '22', time: '8:00 am' },
                    { day: 'Tue', date: '23', time: '9:00 am' },
                    { day: 'Wed', date: '24', active: true, event: { title: 'Weekly Team Sync', sub: 'Discuss progress on projects', avatars: [1, 2, 3] } },
                    { day: 'Thu', date: '25', time: null },
                    { day: 'Fri', date: '26', event: { title: 'Onboarding Session', sub: 'Introduction for new hires', avatars: [4, 5], light: true } },
                    { day: 'Sat', date: '27', time: null },
                ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center relative z-10 w-full">
                        <Text className="text-xs text-gray-400 mb-1">{item.day}</Text>
                        <Text className={`text-sm font-medium mb-8 ${item.active ? 'text-black' : 'text-gray-400'}`}>{item.date}</Text>

                        {/* Event Card logic */}
                        <div className="h-16 w-full flex justify-center">
                            {item.event && !item.event.light && (
                                <div className="bg-[#2D2D2D] text-white p-3 rounded-xl w-[180px] shadow-lg flex items-center justify-between absolute top-10">
                                    <div>
                                        <Text className="text-xs font-medium text-white">{item.event.title}</Text>
                                        <Text className="text-[10px] text-gray-400">{item.event.sub}</Text>
                                    </div>
                                    <div className="flex -space-x-1">
                                        {[1, 2, 3].map(i => <div key={i} className="w-5 h-5 rounded-full bg-gray-200 border border-black"></div>)}
                                    </div>
                                </div>
                            )}
                            {item.event && item.event.light && (
                                <div className="bg-white text-gray-900 p-3 rounded-xl w-[180px] shadow-sm border border-gray-100 flex items-center justify-between absolute top-20">
                                    <div>
                                        <Text className="text-xs font-medium">{item.event.title}</Text>
                                        <Text className="text-[10px] text-gray-500">{item.event.sub}</Text>
                                    </div>
                                    <div className="flex -space-x-1">
                                        {[1, 2].map(i => <div key={i} className="w-5 h-5 rounded-full bg-gray-200 border border-white"></div>)}
                                    </div>
                                </div>
                            )}

                            {!item.event && item.time && (
                                <Text className="text-[10px] text-gray-400 absolute top-10">{item.time}</Text>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const Badge = ({ variant, className, children }) => <span className={className}>{children}</span>; // Quick fix for missing import locally if needed, but I imported it
