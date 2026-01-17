import React from 'react';
import { cn } from '../../lib/utils';

export const Heading = ({ level = 1, children, className }) => {
    const Tag = `h${level}`;
    const styles = {
        1: "text-3xl font-bold",
        2: "text-2xl font-semibold",
        3: "text-xl font-medium",
        4: "text-lg font-medium",
    };
    return <Tag className={cn("text-gray-900", styles[level], className)}>{children}</Tag>;
};

export const Text = ({ children, className, size = 'base', muted }) => {
    const sizes = {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg"
    };

    return <p className={cn(sizes[size], muted ? "text-gray-500" : "text-gray-700", className)}>{children}</p>;
};
