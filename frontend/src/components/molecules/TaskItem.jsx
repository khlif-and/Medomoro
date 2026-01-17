import React from 'react';
import { Check, MessageCircle, Ruler, FileText, Tv, Zap } from 'lucide-react'; // Example icons
import { Text } from '../atoms/Typography';
import { cn } from '../../lib/utils';

export const TaskItem = ({ icon: Icon, title, time, checked }) => {
    // Mapping of internal icons just in case or passed as prop

    return (
        <div className="flex items-start gap-4 p-2 group cursor-pointer hover:bg-white/5 rounded-xl transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#3D3D3D] flex items-center justify-center shrink-0 text-gray-400">
                {Icon && <Icon size={18} />}
            </div>

            <div className="flex-1">
                <Text className="text-gray-200 font-medium text-sm">{title}</Text>
                <Text className="text-gray-500 text-xs mt-0.5">{time}</Text>
            </div>

            <div className={cn(
                "w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center mt-1 transition-colors",
                checked ? "bg-[#FCD34D] border-[#FCD34D] text-black" : "group-hover:border-gray-500"
            )}>
                {checked && <Check size={12} strokeWidth={3} />}
            </div>
        </div>
    );
};
