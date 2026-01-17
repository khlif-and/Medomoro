import React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ children, className, dark, ...props }) => {
    return (
        <div
            className={cn(
                "rounded-3xl p-6 shadow-sm transition-all",
                dark ? "bg-[#2D2D2D] text-white" : "bg-white text-gray-800",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
