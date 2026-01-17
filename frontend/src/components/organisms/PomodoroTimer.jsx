import React from 'react';
import { TimerDisplay } from '../atoms/TimerDisplay';
import { StatusBadge } from '../atoms/StatusBadge';
import { ProgressBar } from '../atoms/ProgressBar';
import { TimerControls } from '../molecules/TimerControls';

export const PomodoroTimer = ({ mode, timeLeft, isActive, settings, onToggle, onReset }) => {
    // Calculate progress
    let totalDuration;
    switch (mode) {
        case 'focus': totalDuration = settings.focusDuration * 60; break;
        case 'short': totalDuration = settings.shortBreakDuration * 60; break;
        case 'long': totalDuration = settings.longBreakDuration * 60; break;
        default: totalDuration = 25 * 60;
    }
    const progress = 1 - (timeLeft / totalDuration);

    return (
        <div className="flex flex-col items-center justify-center">
            <StatusBadge mode={mode} />
            <div className="mt-12 mb-4">
                <TimerDisplay timeLeft={timeLeft} mode={mode} />
            </div>

            <div className="w-full max-w-md px-8">
                <ProgressBar progress={progress} />
            </div>

            <TimerControls
                isActive={isActive}
                onToggle={onToggle}
                onReset={onReset}
            />
        </div>
    );
};
