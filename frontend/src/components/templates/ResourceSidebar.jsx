import React from 'react';
import { createPortal } from 'react-dom';
import { X, Trash2, Plus, Clock, FileText, Calendar } from 'lucide-react';
import { Heading } from '../atoms/Typography';
import { ResourceItem } from '../molecules/ResourceItem';
import { ResourceForm } from '../molecules/ResourceForm';

import { useResourceSidebar } from '../../logic/useResourceSidebar';

export const ResourceSidebar = ({ folder, items, onAddItem, onUpdateItem, onDeleteItem, onDeleteFolder, onClose }) => {
    const {
        isAdding,
        setIsAdding,
        addType,
        setAddType,
        title,
        setTitle,
        url,
        setUrl,
        description,
        setDescription,
        editingItemId,
        handleSubmit,
        handleCancel,
        startEditing,
        handleBrowse
    } = useResourceSidebar({ folder, onAddItem, onUpdateItem });

    const lastEditedStr = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    if (!folder) return null;

    return createPortal(
        <div className="relative z-[9999]">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Sidebar Panel */}
            <div className="fixed inset-y-0 right-0 w-[500px] bg-white shadow-2xl flex flex-col border-l border-gray-200 animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-100 sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <button onClick={onClose} className="p-2 -ml-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all">
                            <X size={20} />
                        </button>
                        <div className="h-4 w-px bg-gray-200 mx-1"></div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-wide">
                            <Calendar size={12} className="text-gray-400" />
                            {lastEditedStr}
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            if (window.confirm('Delete this page/folder?')) {
                                onDeleteFolder(folder.id);
                                onClose();
                            }
                        }}
                        className="text-gray-400 hover:text-red-600 p-2 rounded-md hover:bg-red-50 transition-colors"
                        title="Delete Page"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto bg-gray-50/50">
                    <div className="px-8 py-8">
                        {/* Title */}
                        <div className="group mb-6">
                            <input
                                className="w-full text-3xl font-bold text-gray-900 bg-transparent border-none focus:ring-0 p-0 placeholder-gray-300"
                                value={folder.name}
                                readOnly
                            />
                        </div>

                        {/* Metadata Card */}
                        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8 shadow-sm">
                            <div className="grid grid-cols-[100px_1fr] gap-y-4 text-sm">
                                <div className="text-gray-500 flex items-center gap-2">
                                    <Clock size={14} /> Created
                                </div>
                                <div className="text-gray-900 font-medium">
                                    {folder.createdAt ? folder.createdAt.split('T')[0] : 'Just now'}
                                </div>
                                <div className="text-gray-500 flex items-center gap-2 mt-1">
                                    <FileText size={14} /> Desc
                                </div>
                                <div className="text-gray-900 leading-relaxed">
                                    {folder.description || <span className="text-gray-400 italic">No description added</span>}
                                </div>
                            </div>
                        </div>

                        {/* Resources Header */}
                        <div className="flex items-center justify-between mb-4">
                            <Heading level={4} className="text-sm font-bold text-gray-900 uppercase tracking-wider">Resources</Heading>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{items.length} items</span>
                        </div>

                        {/* Resources List */}
                        <div className="space-y-2 min-h-[100px]">
                            {items.length === 0 && !isAdding && (
                                <div
                                    onClick={() => setIsAdding(true)}
                                    className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer gap-2"
                                >
                                    <Plus size={24} />
                                    <span className="text-sm font-medium">Add your first resource</span>
                                </div>
                            )}

                            {items.map(item => (
                                <ResourceItem
                                    key={item.id}
                                    item={item}
                                    onEdit={() => startEditing(item)}
                                    onDelete={() => onDeleteItem(item.id)}
                                />
                            ))}

                            {isAdding && (
                                <ResourceForm
                                    addType={addType}
                                    setAddType={setAddType}
                                    title={title}
                                    setTitle={setTitle}
                                    url={url}
                                    setUrl={setUrl}
                                    onSubmit={handleSubmit}
                                    onCancel={handleCancel}
                                    isEditing={!!editingItemId}
                                    onBrowse={handleBrowse}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 bg-white flex justify-between items-center z-20 sticky bottom-0">
                    {!isAdding && (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors px-2 py-1 rounded hover:bg-gray-100"
                        >
                            <Plus size={18} />
                            Add Item
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all ml-auto"
                    >
                        Save & Close
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};