import React, { createContext, useContext, useState } from 'react';

const MiniModeContext = createContext();

export const MiniModeProvider = ({ children }) => {
    const [isMiniMode, setIsMiniMode] = useState(false);

    const enterMiniMode = async () => {
        try {
            setIsMiniMode(true); // Update UI first to avoid artifacts
            if (window.go && window.go.main && window.go.main.App) {
                // Small delay to allow React to render the "mini" layout before resizing
                setTimeout(async () => {
                    await window.go.main.App.SetMiniMode();
                }, 50);
            }
        } catch (e) {
            console.error("Failed to enter mini mode:", e);
            setIsMiniMode(false); // Revert on error
        }
    };

    const exitMiniMode = async () => {
        try {
            if (window.go && window.go.main && window.go.main.App) {
                await window.go.main.App.SetFullMode();
                setIsMiniMode(false);
            }
        } catch (e) {
            console.error("Failed to exit mini mode:", e);
        }
    };

    React.useEffect(() => {
        if (isMiniMode) {
            document.body.classList.add('mini-mode');
        } else {
            document.body.classList.remove('mini-mode');
        }
    }, [isMiniMode]);

    return (
        <MiniModeContext.Provider value={{ isMiniMode, enterMiniMode, exitMiniMode }}>
            {children}
        </MiniModeContext.Provider>
    );
};

export const useMiniMode = () => useContext(MiniModeContext);
