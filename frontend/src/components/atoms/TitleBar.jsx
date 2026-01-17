import { WindowMinimise, WindowToggleMaximise, Quit } from '../../../wailsjs/runtime/runtime';
import './TitleBar.css';

export function TitleBar() {
    return (
        <div className="titlebar">
            <div className="titlebar-title">Crextio</div>
            <div className="titlebar-controls">
                <div className="titlebar-button" onClick={WindowMinimise} title="Minimize">
                    <svg width="10" height="10" viewBox="0 0 10.2 1" fill="currentColor">
                        <rect width="10.2" height="1"></rect>
                    </svg>
                </div>
                <div className="titlebar-button" onClick={WindowToggleMaximise} title="Maximize">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="0.5" y="0.5" width="9" height="9"></rect>
                    </svg>
                </div>
                <div className="titlebar-button close" onClick={Quit} title="Close">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                        <path d="M0,0 L10,10 M10,0 L0,10" stroke="currentColor" strokeWidth="1.2"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}
