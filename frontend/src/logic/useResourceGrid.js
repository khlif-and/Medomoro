import { useState } from 'react';

export const useResourceGrid = ({ onAddFolder, onUpdateFolder }) => {
    const [newFolderName, setNewFolderName] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [editingFolderId, setEditingFolderId] = useState(null);
    const [editName, setEditName] = useState("");

    const handleCreate = (e) => {
        e.preventDefault();
        if (newFolderName.trim()) {
            onAddFolder(newFolderName, "");
            setNewFolderName("");
            setIsCreating(false);
        }
    };

    const startEditing = (e, folder) => {
        e.stopPropagation();
        setEditingFolderId(folder.id);
        setEditName(folder.name);
    };

    const handleUpdate = (e, folder) => {
        e.preventDefault();
        e.stopPropagation();
        if (editName.trim()) {
            onUpdateFolder(folder.id, editName, folder.description);
            setEditingFolderId(null);
        }
    };

    const cancelEditing = () => {
        setEditingFolderId(null);
    };

    return {
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
    };
};
