
import React, { useState, useEffect } from 'react';
import { Card } from '../atoms/Card';
import { Heading, Text } from '../atoms/Typography';
import { Badge } from '../atoms/Badge';
import { useSystemLogic } from '../../logic/useSystemLogic';
import { Pencil, Check, Upload } from 'lucide-react';

export const ProfileCard = ({ user }) => {
    const { updateProfile, updateAvatar } = useSystemLogic();
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        username: user?.username || "Khalif",
        role: user?.role || "Premium Member",
        balance: user?.balance || "$1,200"
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || "Khalif",
                role: user.role || "Premium Member",
                balance: user.balance || "$1,200"
            })
        }
    }, [user]);

    // Default avatar if none provided or loading
    const avatarSrc = user?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop";

    const handleSave = () => {
        updateProfile(formData.username, formData.role, formData.balance);
        setIsEditing(false);
    };

    return (
        <Card className="relative w-full h-[400px] overflow-hidden rounded-[32px] group shadow-xl border border-white/10">
            {/* Background Image */}
            <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700">
                <img
                    src={avatarSrc}
                    alt="Profile Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent ${isEditing ? 'opacity-95' : 'opacity-90'}`} />

            {/* Edit Controls */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
                {isEditing ? (
                    <>
                        <button onClick={updateAvatar} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors" title="Change Background">
                            <Upload size={18} />
                        </button>
                        <button onClick={handleSave} className="p-2 bg-green-500/80 backdrop-blur-md rounded-full text-white hover:bg-green-600 transition-colors" title="Save Changes">
                            <Check size={18} />
                        </button>
                    </>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white/50 hover:bg-white/30 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                        <Pencil size={18} />
                    </button>
                )}
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                <div className="flex justify-between items-end w-full">
                    {/* User Info */}
                    <div className="flex flex-col gap-1 w-full max-w-[60%]">
                        {isEditing ? (
                            <div className="flex flex-col gap-2">
                                <input
                                    value={formData.username}
                                    placeholder="Nama (Muncul di Welcome)"
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-2xl font-bold focus:outline-none focus:border-blue-400 placeholder-white/30"
                                />
                                <input
                                    value={formData.role}
                                    placeholder="Role / Status (cth: Mahasiswa)"
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white/80 text-sm focus:outline-none focus:border-blue-400 placeholder-white/30"
                                />
                            </div>
                        ) : (
                            <>
                                <Heading level={2} className="text-white text-3xl font-bold tracking-tight truncate">
                                    {formData.username}
                                </Heading>
                                <Text className="text-white/70 text-base font-medium tracking-wide">
                                    {formData.role}
                                </Text>
                            </>
                        )}
                    </div>

                    {/* Balance Badge */}
                    <div className="mb-1">
                        {isEditing ? (
                            <input
                                value={formData.balance}
                                onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                                className="w-24 bg-white/10 border border-white/20 rounded px-2 py-1 text-white font-bold text-center focus:outline-none focus:border-blue-400"
                            />
                        ) : (
                            <div className="px-6 py-2.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md shadow-lg">
                                <span className="text-white font-bold text-lg tracking-wide">{formData.balance}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};
