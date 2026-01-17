import { Outlet } from 'react-router-dom';
import { TitleBar } from '../atoms/TitleBar';
import { TopNav } from '../organisms/TopNav';
import { useMiniMode } from '../../context/MiniModeContext';
import { usePomodoroContext } from '../../context/PomodoroContext';
import MiniTimerView from '../organisms/MiniTimerView';

export const RootLayout = () => {
    const { isMiniMode, exitMiniMode } = useMiniMode();
    const { timeLeft, isActive, toggleTimer, mode } = usePomodoroContext();

    return (
        <div key={isMiniMode ? 'mini' : 'full'} className="flex flex-col h-screen overflow-hidden">
            {!isMiniMode && <TitleBar />}

            <div className={`flex-1 relative overflow-hidden transition-colors duration-200 bg-[#F9F8F4]`}>
                {!isMiniMode && <TopNav />}

                <div className={`absolute inset-0 ${isMiniMode ? '' : 'overflow-y-scroll pt-20 pb-10 px-8'}`}>
                    <div className={isMiniMode ? 'h-full w-full' : 'max-w-[1600px] mx-auto'}>
                        {isMiniMode ? (
                            <MiniTimerView
                                time={timeLeft}
                                isRunning={isActive}
                                onToggle={toggleTimer}
                                onExpand={exitMiniMode}
                                mode={mode}
                            />
                        ) : (
                            <Outlet />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
