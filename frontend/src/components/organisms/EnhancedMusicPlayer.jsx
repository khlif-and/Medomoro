import React, { useRef } from 'react';
import { Upload, Play, Pause, SkipBack, SkipForward, Repeat, Volume2, Music } from 'lucide-react';

export const EnhancedMusicPlayer = ({
    isPlaying,
    onToggle,
    onUpload,
    currentTrack,
    volume,
    onVolumeChange,
    isRepeat,
    onToggleRepeat
}) => {
    const fileInputRef = useRef(null);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-4 rounded-full shadow-2xl border border-gray-100 flex items-center gap-6 animate-in slide-in-from-bottom-5 duration-500">
            <input
                type="file"
                ref={fileInputRef}
                onChange={onUpload}
                accept="audio/*"
                className="hidden"
            />

            {/* Track Info / Upload */}
            <div className="flex items-center gap-3 pr-4 border-r border-gray-100">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                    <Music size={18} />
                </div>
                <div className="flex flex-col max-w-[120px]">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Now Playing</span>
                    {currentTrack ? (
                        <span className="text-xs font-bold text-gray-800 truncate" title={currentTrack.name}>{currentTrack.name}</span>
                    ) : (
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="text-xs font-bold text-blue-500 hover:underline text-left"
                        >
                            Select File...
                        </button>
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-gray-900 transition-colors">
                    <SkipBack size={20} />
                </button>

                <button
                    onClick={onToggle}
                    className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all active:scale-95"
                    disabled={!currentTrack}
                >
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                </button>

                <button className="text-gray-400 hover:text-gray-900 transition-colors">
                    <SkipForward size={20} />
                </button>
            </div>

            {/* Extra Controls */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                <div className="group relative flex items-center gap-2">
                    <Volume2 size={18} className="text-gray-400" />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                        className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full"
                    />
                </div>

                <button
                    onClick={onToggleRepeat}
                    className={`p-1.5 rounded-md transition-colors ${isRepeat ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-900'}`}
                    title="Repeat"
                >
                    <Repeat size={18} />
                </button>
            </div>
        </div>
    );
};
