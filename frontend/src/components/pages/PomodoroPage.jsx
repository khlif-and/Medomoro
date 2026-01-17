import React, { useState } from 'react';
import { usePomodoroContext } from '../../context/PomodoroContext'; // UPDATED IMPORTS
import { useMusicPlayer } from '../../logic/useMusicPlayer';
import { ModeSwitcher } from '../molecules/ModeSwitcher';
import { CircularTimer } from '../atoms/CircularTimer';
import { BottomControls } from '../molecules/BottomControls';
import { SettingsPanel } from '../organisms/SettingsPanel';
import { EnhancedMusicPlayer } from '../organisms/EnhancedMusicPlayer';
import { PomodoroStats } from '../molecules/PomodoroStats';
import { AmbientSoundBoard } from '../molecules/AmbientSoundBoard';
import { Heading, Text } from '../atoms/Typography';
import MiniTimerView from '../organisms/MiniTimerView';
import { useMiniMode } from '../../context/MiniModeContext';

const PomodoroPage = () => {
    const {
        mode,
        timeLeft,
        isActive,
        settings,
        cycles,
        toggleTimer,
        resetTimer,
        updateSettings,
        switchMode
    } = usePomodoroContext(); // USE CONTEXT

    const {
        currentTrack,
        isPlaying,
        volume,
        isRepeat,
        handleFileUpload,
        togglePlay,
        handleVolumeChange,
        toggleRepeat
    } = useMusicPlayer();

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { isMiniMode, enterMiniMode, exitMiniMode } = useMiniMode();

    // Calculate progress for the ring
    let totalDuration;
    switch (mode) {
        case 'focus': totalDuration = settings.focusDuration * 60; break;
        case 'short': totalDuration = settings.shortBreakDuration * 60; break;
        case 'long': totalDuration = settings.longBreakDuration * 60; break;
        default: totalDuration = 25 * 60;
    }

    // MINI MODE VIEW
    if (isMiniMode) {
        return (
            <MiniTimerView
                time={timeLeft}
                isRunning={isActive}
                onToggle={toggleTimer}
                onExpand={exitMiniMode}
                mode={mode}
            />
        );
    }

    // FULL MODE VIEW
    return (
        <>
            <main className="relative container mx-auto px-4 py-8 min-h-[calc(100vh-80px)] flex flex-col">

                {/* Header Title */}
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <Heading level={1} className="text-3xl font-bold tracking-tight text-gray-900">Pomodoro Focus</Heading>
                        <Text muted className="mt-1">Manage your time effectively with the Pomodoro Technique.</Text>
                    </div>
                    {/* Mini Mode Button */}
                    <button
                        onClick={enterMiniMode}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-bold text-gray-600 transition-colors flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3" /><path d="M21 8h-3a2 2 0 0 1-2-2V3" /><path d="M3 16h3a2 2 0 0 1 2 2v3" /><path d="M16 21v-3a2 2 0 0 1 2-2h3" /></svg>
                        Mini Mode
                    </button>
                </div>

                <div className="flex items-start justify-center gap-12 mt-8">
                    {/* Left Column: Stats */}
                    <div className="hidden xl:block animate-in slide-in-from-left-10 duration-700 delay-100">
                        <PomodoroStats cycles={cycles} />
                    </div>

                    {/* Center Column: Timer */}
                    <div className="flex flex-col items-center z-10">
                        {/* 1. Mode Tabs (Pill) */}
                        <ModeSwitcher mode={mode} onSwitch={switchMode} />

                        {/* 2. Circular Timer */}
                        <CircularTimer
                            timeLeft={timeLeft}
                            totalTime={totalDuration}
                            mode={mode}
                        />

                        {/* 3. Bottom Controls */}
                        <BottomControls
                            isActive={isActive}
                            onToggle={toggleTimer}
                            onReset={resetTimer}
                            onSettings={() => setIsSettingsOpen(true)}
                        />
                    </div>

                    {/* Right Column: Ambience */}
                    <div className="hidden xl:block animate-in slide-in-from-right-10 duration-700 delay-100">
                        <AmbientSoundBoard />
                    </div>
                </div>

                {/* 4. Enhanced Music Player (Floating Bottom Bar) */}
                <EnhancedMusicPlayer
                    isPlaying={isPlaying}
                    onToggle={togglePlay}
                    onUpload={handleFileUpload}
                    currentTrack={currentTrack}
                    volume={volume}
                    onVolumeChange={handleVolumeChange}
                    isRepeat={isRepeat}
                    onToggleRepeat={toggleRepeat}
                />

                {/* Settings Modal */}
                <SettingsPanel
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                    settings={settings}
                    onUpdate={updateSettings}
                />

            </main>
        </>
    );
};

export default PomodoroPage;
