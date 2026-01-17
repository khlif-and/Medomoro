import React from 'react';
import { cn } from '../../lib/utils';

export const Button = ({ children, className, variant = 'primary', ...props }) => {
    const variants = {
        primary: "bg-[#2D2D2D] text-white hover:bg-black",
        secondary: "bg-[#FCD34D] text-[#2D2D2D] hover:bg-[#FBBF24]",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
        icon: "p-2 rounded-full hover:bg-gray-100 text-gray-600"
    };

    return (
        <button
            className={cn(
                "px-6 py-2.5 rounded-full font-medium transition-colors flex items-center justify-center gap-2",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
