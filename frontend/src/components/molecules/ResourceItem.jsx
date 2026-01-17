import React from 'react';
import { FileText, Link as LinkIcon, Edit2, Trash2 } from 'lucide-react';
import { OpenFile } from '../../../wailsjs/go/controller/ResourceController';

export const ResourceItem = ({ item, onEdit, onDelete }) => {
    const handleOpen = () => {
        OpenFile(item.url).catch(err => console.error("Failed to open file:", err));
    };

    return (
        <div className="group flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all relative">
            <div className={`mt-0.5 p-2 rounded-lg ${item.type === 'pdf' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                {item.type === 'pdf' ? <FileText size={18} /> : <LinkIcon size={18} />}
            </div>
            <div className="flex-1 min-w-0">
                <button
                    onClick={handleOpen}
                    className="block text-left text-sm font-semibold text-gray-900 hover:text-blue-600 truncate mb-0.5"
                >
                    {item.title}
                </button>
                <div className="text-xs text-gray-500 truncate font-mono bg-gray-50 inline-block px-1.5 py-0.5 rounded">
                    {item.url}
                </div>
            </div>

            <div className="absolute right-2 top-2 hidden group-hover:flex items-center bg-white shadow-sm border border-gray-100 rounded-lg overflow-hidden">
                <button onClick={onEdit} className="p-1.5 text-gray-500 hover:bg-gray-50 hover:text-blue-600">
                    <Edit2 size={14} />
                </button>
                <div className="w-px h-4 bg-gray-100"></div>
                <button onClick={onDelete} className="p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600">
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
};
