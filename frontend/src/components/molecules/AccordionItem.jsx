import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Text } from '../atoms/Typography';
import { cn } from '../../lib/utils';

export const AccordionItem = ({ title, content, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-100 last:border-0 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
                <div className="flex items-center gap-3">
                    {/* Use a placeholder box if no icon provided, or renders the icon */}
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                        {Icon ? <Icon size={16} /> : <div className="w-2 h-2 bg-gray-300 rounded-full" />}
                    </div>
                    <Text className="font-medium text-gray-700">{title}</Text>
                </div>
                {isOpen ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
            </button>

            {isOpen && (
                <div className="pl-14 pr-4 py-2 text-sm text-gray-500">
                    {content || "No details available."}
                </div>
            )}
        </div>
    );
};
