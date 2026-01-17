import React from 'react';

export const SettingsInputs = ({ settings, onUpdate }) => {
    const handleChange = (key, value) => {
        onUpdate({ [key]: parseInt(value) || 0 });
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Focus</label>
                    <input
                        type="number"
                        value={settings.focusDuration}
                        onChange={(e) => handleChange('focusDuration', e.target.value)}
                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-center font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Short Break</label>
                    <input
                        type="number"
                        value={settings.shortBreakDuration}
                        onChange={(e) => handleChange('shortBreakDuration', e.target.value)}
                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-center font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Long Break</label>
                    <input
                        type="number"
                        value={settings.longBreakDuration}
                        onChange={(e) => handleChange('longBreakDuration', e.target.value)}
                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-center font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-sm font-medium text-gray-600">Long Break Interval</span>
                <input
                    type="number"
                    value={settings.longBreakInterval}
                    onChange={(e) => handleChange('longBreakInterval', e.target.value)}
                    className="w-20 p-1 bg-white border border-gray-200 rounded text-center font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-sm font-medium text-gray-600">Auto-start Breaks</span>
                <input
                    type="checkbox"
                    checked={settings.autoStartBreaks}
                    onChange={(e) => onUpdate({ autoStartBreaks: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                />
            </div>
        </div>
    );
};
