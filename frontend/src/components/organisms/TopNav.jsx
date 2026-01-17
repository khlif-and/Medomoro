import React from 'react';
import { NavItem } from '../molecules/NavItem';
import { Button } from '../atoms/Button';
import { useLocation } from 'react-router-dom';

import { Bell, Settings, User } from 'lucide-react';
import { Heading } from '../atoms/Typography';

export const TopNav = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => {
        if (path === '/dashboard' && (currentPath === '/' || currentPath === '/dashboard')) return true;
        return currentPath.startsWith(path);
    };

    return (
        <div className="relative z-10 flex items-center justify-between py-6 px-8">
            <div className="flex items-center gap-2">
                <Heading level={3} className="text-2xl font-bold tracking-tight">Crextio</Heading>
            </div>

            <nav className="flex items-center gap-1 bg-white p-1.5 rounded-full shadow-sm">
                <NavItem to="/dashboard" active={isActive('/dashboard')}>Dashboard</NavItem>
                <NavItem to="/task" active={isActive('/task')}>Task</NavItem>
                <NavItem to="/memo" active={isActive('/memo')}>Memo</NavItem>
                <NavItem>Pomodoro</NavItem>
                <NavItem>Journal</NavItem>
                <NavItem>Calendar</NavItem>
                <NavItem>MyMuslim</NavItem>
                <NavItem>NoFaps</NavItem>
                <Button variant="ghost" className="px-4 py-2 text-sm font-medium rounded-full bg-gray-100/50 hover:bg-gray-100 ml-2">
                    <Settings size={16} className="mr-2" /> Setting
                </Button>
            </nav>

            <div className="flex items-center gap-3">
                <Button variant="icon" className="bg-white shadow-sm w-10 h-10">
                    <Bell size={20} />
                </Button>
                <Button variant="icon" className="bg-white shadow-sm w-10 h-10">
                    <User size={20} />
                </Button>
            </div>
        </div>
    );
};
