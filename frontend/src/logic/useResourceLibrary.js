import { useState, useEffect } from 'react';
import { GetData, AddFolder, UpdateFolder, DeleteFolder, AddItem, UpdateItem, DeleteItem } from '../../wailsjs/go/controller/ResourceController';

export const useResourceLibrary = () => {
    const [folders, setFolders] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await GetData();
            if (data) {
                setFolders(data.folders || []);
                setItems(data.items || []);
            }
        } catch (err) {
            console.error("Failed to fetch resources", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addFolder = async (name, description) => {
        try {
            const data = await AddFolder(name, description);
            if (data) {
                setFolders(data.folders || []);
                setItems(data.items || []);
            }
        } catch (err) {
            console.error("Failed to add folder", err);
        }
    };

    const updateFolder = async (id, name, description) => {
        try {
            const data = await UpdateFolder(id, name, description);
            if (data) {
                setFolders(data.folders || []);
                setItems(data.items || []);
            }
        } catch (err) {
            console.error("Failed to update folder", err);
        }
    };

    const deleteFolder = async (id) => {
        try {
            const data = await DeleteFolder(id);
            if (data) {
                setFolders(data.folders || []);
                setItems(data.items || []);
            }
        } catch (err) {
            console.error("Failed to delete folder", err);
        }
    };

    const addItem = async (folderId, type, title, url, description) => {
        try {
            const data = await AddItem(folderId, type, title, url, description);
            if (data) {
                setFolders(data.folders || []);
                setItems(data.items || []);
            }
        } catch (err) {
            console.error("Failed to add item", err);
        }
    };

    const updateItem = async (id, title, url, description) => {
        try {
            const data = await UpdateItem(id, title, url, description);
            if (data) {
                setFolders(data.folders || []);
                setItems(data.items || []);
            }
        } catch (err) {
            console.error("Failed to update item", err);
        }
    };

    const deleteItem = async (id) => {
        try {
            const data = await DeleteItem(id);
            if (data) {
                setFolders(data.folders || []);
                setItems(data.items || []);
            }
        } catch (err) {
            console.error("Failed to delete item", err);
        }
    };

    return {
        folders,
        items,
        loading,
        addFolder,
        updateFolder,
        deleteFolder,
        addItem,
        updateItem,
        deleteItem
    };
};
