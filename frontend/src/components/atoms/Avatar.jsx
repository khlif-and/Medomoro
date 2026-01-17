import React from 'react';
import { cn } from '../../lib/utils';

export const Avatar = ({ src, alt, size = 'md', className }) => {
    const sizes = {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-16 h-16",
        xl: "w-32 h-32"
    };

    return (
        <div className={cn("overflow-hidden rounded-full flex-shrink-0 bg-gray-200", sizes[size], className)}>
            <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
    );
};
