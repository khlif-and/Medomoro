import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePomodoroStats } from '../logic/usePomodoroStats';

// Keys for persistence
const SETTINGS_KEY = 'pomodoroSettings';
const STATE_KEY = 'pomodoroState';

const DEFAULT_SETTINGS = {
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4,
    autoStartBreaks: true,
    autoStartPomodoros: false,
};

const PomodoroContext = createContext();

export const PomodoroProvider = ({ children }) => {
    // 1. Settings Persistence
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem(SETTINGS_KEY);
        return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    });

    useEffect(() => {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }, [settings]);

    // 2. State Initialization
    const [state, setState] = useState(() => {
        const savedState = localStorage.getItem(STATE_KEY);
        const defaults = {
            mode: 'focus',
            timeLeft: settings.focusDuration * 60,
            isActive: false,
            cycles: 0
        };

        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                if (parsed.isActive && parsed.targetTime) {
                    const now = Date.now();
                    const remaining = Math.ceil((parsed.targetTime - now) / 1000);
                    if (remaining > 0) {
                        return { ...parsed, timeLeft: remaining };
                    } else {
                        return { ...parsed, timeLeft: 0, isActive: false };
                    }
                }
                return { ...parsed, isActive: false };
            } catch (e) {
                return defaults;
            }
        }
        return defaults;
    });

    const { mode, timeLeft, isActive, cycles } = state;
    const updateState = (updates) => setState(prev => ({ ...prev, ...updates }));

    const timerRef = useRef(null);
    const { recordSession } = usePomodoroStats();

    // 3. Persistent Saver
    useEffect(() => {
        const stateToSave = {
            mode,
            timeLeft,
            isActive,
            cycles,
            targetTime: isActive ? Date.now() + (timeLeft * 1000) : null
        };
        localStorage.setItem(STATE_KEY, JSON.stringify(stateToSave));
    }, [mode, timeLeft, isActive, cycles]);

    // 4. Timer Logic
    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                updateState({ timeLeft: timeLeft - 1 });
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            handleTimerComplete();
        }

        return () => clearInterval(timerRef.current);
    }, [isActive, timeLeft]);

    const handleTimerComplete = () => {
        updateState({ isActive: false });
        playNotification();

        if (mode === 'focus') {
            const newCycles = cycles + 1;
            recordSession(settings.focusDuration);

            let nextMode = 'short';
            let shouldStart = settings.autoStartBreaks;
            if (newCycles % settings.longBreakInterval === 0) {
                nextMode = 'long';
            }

            let nextDuration = settings.shortBreakDuration;
            if (nextMode === 'long') nextDuration = settings.longBreakDuration;

            setState(prev => ({
                ...prev,
                cycles: newCycles,
                mode: nextMode,
                timeLeft: nextDuration * 60,
                isActive: shouldStart
            }));

        } else {
            let shouldStart = settings.autoStartPomodoros;
            setState(prev => ({
                ...prev,
                mode: 'focus',
                timeLeft: settings.focusDuration * 60,
                isActive: shouldStart
            }));
        }
    };

    const switchMode = (newMode) => {
        let duration = 25;
        switch (newMode) {
            case 'focus': duration = settings.focusDuration; break;
            case 'short': duration = settings.shortBreakDuration; break;
            case 'long': duration = settings.longBreakDuration; break;
        }

        setState(prev => ({
            ...prev,
            mode: newMode,
            isActive: false,
            timeLeft: duration * 60
        }));
    };

    const resetTimer = () => {
        let duration = 25;
        switch (mode) {
            case 'focus': duration = settings.focusDuration; break;
            case 'short': duration = settings.shortBreakDuration; break;
            case 'long': duration = settings.longBreakDuration; break;
        }
        setState(prev => ({
            ...prev,
            isActive: false,
            timeLeft: duration * 60
        }));
    };

    const toggleTimer = () => updateState({ isActive: !isActive });
    const updateSettings = (newSettings) => setSettings({ ...settings, ...newSettings });
    const playNotification = () => {
        new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play().catch(e => console.log(e));
    };

    return (
        <PomodoroContext.Provider value={{
            mode, timeLeft, isActive, cycles, settings,
            toggleTimer, resetTimer, updateSettings, switchMode
        }}>
            {children}
        </PomodoroContext.Provider>
    );
};

export const usePomodoroContext = () => useContext(PomodoroContext);
