import React from 'react';
import { Folder, Edit2 } from 'lucide-react';
import { Heading, Text } from '../atoms/Typography';
import { useResourceGrid } from '../../logic/useResourceGrid';

export const ResourceGrid = ({ folders, onFolderClick, onAddFolder, onUpdateFolder }) => {
    const {
        newFolderName,
        setNewFolderName,
        isCreating,
        setIsCreating,
        editingFolderId,
        editName,
        setEditName,
        handleCreate,
        startEditing,
        handleUpdate,
        cancelEditing,
    } = useResourceGrid({ onAddFolder, onUpdateFolder });

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Heading level={3} className="text-xl">Resource Library</Heading>
                    <Text className="text-gray-500 text-sm">Organize your study materials</Text>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1b2636] text-white rounded-lg hover:bg-[#2c3e50] transition-colors font-medium text-sm"
                >
                    <Folder size={16} /> New Folder
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-y-auto pb-10 pr-2 custom-scrollbar">
                {isCreating && (
                    <div className="aspect-[4/3] bg-white border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-4">
                        <Folder size={32} className="text-gray-300 mb-2" />
                        <form onSubmit={handleCreate} className="w-full">
                            <input
                                autoFocus
                                className="w-full text-center text-sm border-b border-gray-300 focus:border-[#1b2636] focus:outline-none p-1"
                                placeholder="Folder Name"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                onBlur={() => setIsCreating(false)}
                            />
                        </form>
                    </div>
                )}

                {folders.map(folder => (
                    <div
                        key={folder.id}
                        onClick={() => onFolderClick(folder)}
                        className="group relative aspect-[4/3] bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-xl p-4 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-1"
                    >
                        <button
                            onClick={(e) => startEditing(e, folder)}
                            className="absolute top-2 right-2 p-1.5 bg-white/50 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 hover:bg-white text-gray-500 hover:text-blue-600 transition-all z-10"
                        >
                            <Edit2 size={12} />
                        </button>

                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-2">
                            <Folder size={20} fill="currentColor" className="opacity-20 text-blue-500" />
                            <Folder size={20} className="absolute text-blue-600" />
                        </div>
                        <div>
                            {editingFolderId === folder.id ? (
                                <form onSubmit={(e) => handleUpdate(e, folder)} onClick={(e) => e.stopPropagation()}>
                                    <input
                                        autoFocus
                                        className="w-full text-sm border-b border-blue-500 focus:outline-none bg-transparent"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        onBlur={cancelEditing}
                                    />
                                </form>
                            ) : (
                                <h4 className="font-medium text-gray-800 truncate" title={folder.name}>{folder.name}</h4>
                            )}
                            <p className="text-xs text-gray-400 mt-1">{folder.createdAt ? folder.createdAt.split('T')[0] : 'Just now'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
