import React, { useState, useRef } from 'react';
import { CloudRain, Coffee, Wind, Droplets } from 'lucide-react';

const sounds = [
    { id: 'rain', label: 'Rain', icon: CloudRain, url: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3' }, // Placeholder URLs
    { id: 'cafe', label: 'Cafe', icon: Coffee, url: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3' },
    { id: 'wind', label: 'Wind', icon: Wind, url: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3' },
    { id: 'stream', label: 'Stream', icon: Droplets, url: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3' },
];

export const AmbientSoundBoard = () => {
    const [activeSound, setActiveSound] = useState(null);
    const audioRef = useRef(new Audio());

    const toggleSound = (sound) => {
        if (activeSound === sound.id) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Reset time
            setActiveSound(null);
        } else {
            // Stop previous if any
            if (activeSound) {
                audioRef.current.pause();
            }
            audioRef.current.src = sound.url;
            audioRef.current.loop = true;
            audioRef.current.play().catch(e => console.log(e));
            setActiveSound(sound.id);
        }
    };

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100 w-72 h-fit">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Wind size={16} className="text-gray-400" />
                Ambience
            </h3>

            <div className="grid grid-cols-2 gap-3">
                {sounds.map((sound) => {
                    const Icon = sound.icon;
                    const isActive = activeSound === sound.id;
                    return (
                        <button
                            key={sound.id}
                            onClick={() => toggleSound(sound)}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${isActive
                                ? 'bg-black text-white shadow-md scale-105'
                                : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                                }`}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2 : 1.5} className="mb-2" />
                            <span className="text-xs font-bold">{sound.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
