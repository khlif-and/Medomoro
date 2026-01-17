import React from 'react';
import { Heading, Text } from '../atoms/Typography';

export const StatItem = ({ value, label, icon: Icon }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
                {Icon && <Icon size={18} className="text-gray-400" />}
                <Heading level={2} className="text-4xl font-light">{value}</Heading>
            </div>
            <Text size="sm" muted className="mt-1">{label}</Text>
        </div>
    );
};
