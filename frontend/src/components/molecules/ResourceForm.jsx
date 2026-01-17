import React from 'react';
import { Button } from '../atoms/Button';

export const ResourceForm = ({
    addType,
    setAddType,
    title,
    setTitle,
    url,
    setUrl,
    onSubmit,
    onCancel,
    isEditing
}) => {
    return (
        <div className="bg-white border border-blue-200 shadow-lg rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2 ring-4 ring-blue-50">
            <div className="flex gap-2 mb-3">
                {['link', 'pdf'].map(type => (
                    <button
                        key={type}
                        onClick={() => setAddType(type)}
                        className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md border transition-all ${addType === type
                            ? (type === 'link' ? 'bg-blue-600 text-white border-blue-600' : 'bg-red-600 text-white border-red-600')
                            : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
            <form onSubmit={onSubmit} className="space-y-3">
                <input
                    className="w-full text-sm px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Resource Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />
                <input
                    className="w-full text-sm px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                    placeholder={addType === 'link' ? "https://..." : "/path/to/file.pdf"}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" onClick={onCancel} size="sm" variant="ghost" className="text-xs text-gray-500 hover:text-gray-900">
                        Cancel
                    </Button>
                    <Button type="submit" size="sm" className="bg-black text-white hover:bg-gray-800 text-xs px-4 shadow-lg shadow-gray-200">
                        {isEditing ? 'Update' : 'Add'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
