import React from 'react';
import { Brain, Coffee, BatteryCharging } from 'lucide-react';

export const StatusBadge = ({ mode }) => {
    const getConfig = () => {
        switch (mode) {
            case 'focus':
                return {
                    label: 'FOCUS TIME',
                    icon: Brain,
                    style: 'bg-red-50 text-red-600 border-red-100'
                };
            case 'short':
                return {
                    label: 'SHORT BREAK',
                    icon: Coffee,
                    style: 'bg-green-50 text-green-600 border-green-100'
                };
            case 'long':
                return {
                    label: 'LONG BREAK',
                    icon: BatteryCharging,
                    style: 'bg-blue-50 text-blue-600 border-blue-100'
                };
            default: return {};
        }
    };

    const { label, icon: Icon, style } = getConfig();

    return (
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest ${style} transition-all duration-300`}>
            <Icon size={14} strokeWidth={2.5} />
            {label}
        </div>
    );
};
