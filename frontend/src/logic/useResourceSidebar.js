import { useState, useEffect } from 'react';
import { SelectFile } from '../../wailsjs/go/controller/ResourceController';

export const useResourceSidebar = ({ folder, onAddItem, onUpdateItem }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [addType, setAddType] = useState('link');
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [editingItemId, setEditingItemId] = useState(null);

    // Prevent body scroll when sidebar is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        if (editingItemId) {
            await onUpdateItem(editingItemId, title, url, description);
        } else {
            await onAddItem(folder.id, addType, title, url, description);
        }
        handleCancel();
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingItemId(null);
        setTitle("");
        setUrl("");
        setDescription("");
    };

    const startEditing = (item) => {
        setEditingItemId(item.id);
        setAddType(item.type);
        setTitle(item.title);
        setUrl(item.url);
        setDescription(item.description);
        setIsAdding(true);
    };

    const handleBrowse = async () => {
        try {
            const path = await SelectFile();
            if (path) {
                setUrl(path);
                // Auto-fill title if empty
                if (!title) {
                    // Extract filename from path (heuristic for Windows/Unix)
                    const filename = path.split(/[\\/]/).pop();
                    setTitle(filename);
                }
            }
        } catch (err) {
            console.error("Failed to select file", err);
        }
    };

    return {
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
    };
};
