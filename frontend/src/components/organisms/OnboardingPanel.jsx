import React from 'react';
import { Card } from '../atoms/Card';
import { Heading, Text } from '../atoms/Typography';
import { TaskItem } from '../molecules/TaskItem';
import { FileText } from 'lucide-react';
import { useOnboardingPanel } from '../../logic/useOnboardingPanel';

export const OnboardingPanel = () => {
    const { displayedTasks, pendingCount } = useOnboardingPanel();

    return (
        <Card className="bg-[#2D2D2D] text-white h-fit flex flex-col p-8" dark>
            <div className="flex justify-between items-end mb-8">
                <Heading level={3} className="text-xl font-normal text-white max-w-[120px]">Onboarding Task</Heading>
                <span className="text-2xl font-light text-white/50">{pendingCount > 8 ? '8+' : pendingCount} Pending</span>
            </div>

            <div className="flex-1 flex flex-col gap-1 overflow-y-auto pr-2 custom-scrollbar-dark">
                {displayedTasks.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 text-sm">
                        No pending tasks
                    </div>
                ) : (
                    displayedTasks.map(task => (
                        <TaskItem
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            time={task.createdAt} // Or better formatting
                            icon={FileText}
                            checked={task.isDone}
                        />
                    ))
                )}
            </div>
        </Card>
    );
};
