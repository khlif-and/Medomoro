import React from 'react';

export const TabButton = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
        ${active
                ? 'bg-[#1b2636] text-white shadow-md'
                : 'bg-white text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
    >
        <Icon size={16} />
        {label}
    </button>
);
