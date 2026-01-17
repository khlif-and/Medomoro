
import React from 'react';
import { Card } from '../atoms/Card';
import { Heading, Text } from '../atoms/Typography';
import { Badge } from '../atoms/Badge';

export const ProfileCard = ({ user }) => {
    // Default avatar if none provided or loading
    const avatarSrc = user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix";
    const username = user?.username || "Khalif";
    const userRole = user?.role || "Premium Member";
    const userBalance = user?.balance || "$1,200";

    return (
        <Card className="bg-[#1b2636] text-white p-6 w-full flex flex-col items-center text-center relative overflow-hidden">
            {/* Patterns (if any, based on the original "Glossy Effect" or new design) */}
            {/* The original glossy effect was removed by the new Card className, but keeping this comment for context */}
            {/* <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-30 pointer-events-none transform rotate-12" /> */}

            <div className="w-20 h-20 rounded-full border-4 border-white/10 mb-4 overflow-hidden relative z-10">
                <img
                    src={avatarSrc}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            </div>

            <Heading level={3} className="text-xl font-bold mb-1 relative z-10">{username}</Heading>
            <Text className="text-gray-400 text-sm mb-6 relative z-10">{userRole}</Text>

            {/* Re-integrating the badge, assuming it's still desired in the new layout */}
            <div className="relative z-10">
                <Badge variant="dark" className="px-4 py-2 text-base font-semibold border border-white/10 backdrop-blur-md bg-black/40 shadow-inner rounded-2xl">{userBalance}</Badge>
            </div>
        </Card>
    );
};
