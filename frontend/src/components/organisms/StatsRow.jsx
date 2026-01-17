import React from 'react';
import { StatItem } from '../molecules/StatItem';
import { Users, UserPlus, Laptop } from 'lucide-react';

export const StatsRow = () => {
    return (
        <div className="flex items-center gap-12 justify-end">
            <StatItem value="78" label="Employe" icon={Users} />
            <StatItem value="56" label="Hirings" icon={UserPlus} />
            <StatItem value="203" label="Projects" icon={Laptop} />
        </div>
    );
};
