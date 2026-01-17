import React from 'react';
import { Brain, Coffee, BatteryCharging } from 'lucide-react';

export const ModeSwitcher = ({ mode, onSwitch }) => {
    const modes = [
        { id: 'focus', label: 'Focus', icon: Brain, color: 'text-red-500 bg-red-50' },
        { id: 'short', label: 'Short Break', icon: Coffee, color: 'text-teal-600 bg-teal-50' },
        { id: 'long', label: 'Long Break', icon: BatteryCharging, color: 'text-blue-600 bg-blue-50' },
    ];

    return (
        <div className="bg-white rounded-full p-1.5 shadow-sm border border-gray-100 flex items-center gap-1 mb-12">
            {modes.map((m) => {
                const isActive = mode === m.id;
                const Icon = m.icon;
                return (
                    <button
                        key={m.id}
                        onClick={() => onSwitch(m.id)}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${isActive
                                ? `${m.color} shadow-sm`
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <Icon size={16} strokeWidth={2.5} />
                        {m.label}
                    </button>
                );
            })}
        </div>
    );
};
