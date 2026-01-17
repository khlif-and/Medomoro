import React from 'react';
import { MusicControls } from '../molecules/MusicControls';

export const MusicPlayer = ({ isPlaying, onToggle, onUpload, currentTrack }) => {
    return (
        <div className="mt-12 w-full flex justify-center">
            <MusicControls
                isPlaying={isPlaying}
                onToggle={onToggle}
                onUpload={onUpload}
                currentTrack={currentTrack}
            />
        </div>
    );
};
