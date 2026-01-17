import React from 'react';
import { Card } from '../atoms/Card';
import { Heading, Text } from '../atoms/Typography';
import { Badge } from '../atoms/Badge';

export const ProfileCard = () => {
    return (
        <Card className="relative overflow-hidden h-[380px] w-full flex flex-col justify-end p-8 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-700 shadow-lg group hover:shadow-xl transition-all duration-300">
            {/* Glossy Effect */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-30 pointer-events-none transform rotate-12" />

            {/* Content */}
            <div className="relative z-10 flex justify-between items-end w-full">
                <div>
                    <Heading level={2} className="text-white text-3xl font-bold tracking-tight mb-1">Lora Piterson</Heading>
                    <Text className="text-white/90 text-lg font-medium tracking-wide">UX/UI Designer</Text>
                </div>

                <div className="mb-1">
                    <Badge variant="dark" className="px-4 py-2 text-base font-semibold border border-white/10 backdrop-blur-md bg-black/40 shadow-inner rounded-2xl">$1,200</Badge>
                </div>
            </div>
        </Card>
    );
};
