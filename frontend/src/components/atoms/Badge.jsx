import React from 'react';
import { cn } from '../../lib/utils';

export const Badge = ({ children, className, variant = 'dark' }) => {
    const variants = {
        dark: "bg-[#2D2D2D] text-white",
        yellow: "bg-[#FCD34D] text-[#2D2D2D]",
        gray: "bg-gray-200 text-gray-600",
        outline: "border border-gray-300 text-gray-500"
    };

    return (
        <span className={cn(
            "px-4 py-1.5 rounded-full text-xs font-semibold",
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
};
