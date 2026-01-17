import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export const NavItem = ({ children, active, to = "#" }) => {
    return (
        <Link
            to={to}
            className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors inline-block",
                active ? "bg-[#2D2D2D] text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            )}
        >
            {children}
        </Link>
    );
};
