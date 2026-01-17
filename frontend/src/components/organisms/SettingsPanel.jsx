import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Heading } from '../atoms/Typography';
import { SettingsInputs } from '../molecules/SettingsInputs';

export const SettingsPanel = ({ isOpen, onClose, settings, onUpdate }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                    <Heading level={3} className="text-base font-bold text-gray-900 m-0">Settings</Heading>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6">
                    <SettingsInputs settings={settings} onUpdate={onUpdate} />
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm tracking-wide hover:bg-gray-800 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};
