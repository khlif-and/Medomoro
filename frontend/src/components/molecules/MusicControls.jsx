import React, { useRef } from 'react';
import { Upload, Play, Pause, Music } from 'lucide-react';

export const MusicControls = ({ isPlaying, onToggle, onUpload, currentTrack }) => {
    const fileInputRef = useRef(null);

    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm w-full max-w-sm">
            <input
                type="file"
                ref={fileInputRef}
                onChange={onUpload}
                accept="audio/*"
                className="hidden"
            />

            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                <Music size={20} />
            </div>

            <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    Background Music
                </div>
                <div className="text-sm font-medium text-gray-900 truncate">
                    {currentTrack ? currentTrack.name : 'No track loaded'}
                </div>
            </div>

            <div className="flex items-center gap-2">
                {!currentTrack ? (
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 text-gray-500 hover:bg-gray-100 hover:text-black rounded-lg transition-colors"
                        title="Upload Music"
                    >
                        <Upload size={18} />
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                        >
                            <Upload size={16} />
                        </button>
                        <button
                            onClick={onToggle}
                            className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
                        >
                            {isPlaying ? (
                                <Pause size={16} fill="currentColor" />
                            ) : (
                                <Play size={16} fill="currentColor" className="ml-0.5" />
                            )}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
