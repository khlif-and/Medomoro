import { useState, useEffect } from 'react';
import { GetMemos, AddMemo, UpdateMemo, DeleteMemo } from '../../wailsjs/go/controller/MemoController';

export const useStickyNotes = () => {
    const [memos, setMemos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMemos = async () => {
        try {
            setLoading(true);
            const data = await GetMemos();
            setMemos(data || []);
        } catch (err) {
            console.error("Failed to fetch memos", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMemos();
    }, []);

    const addMemo = async () => {
        try {
            const colors = ['#FEE2E2', '#FEF3C7', '#D1FAE5', '#DBEAFE', '#F3E8FF']; // Red, Yellow, Green, Blue, Purple (Pastel)
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const updated = await AddMemo("", randomColor);
            setMemos(updated || []);
        } catch (err) {
            console.error("Failed to add memo", err);
        }
    };

    const updateMemo = async (memo) => {
        // Optimistic update
        setMemos(current => current.map(m => m.id === memo.id ? memo : m));
        try {
            await UpdateMemo(memo);
        } catch (err) {
            console.error("Failed to update memo", err);
            fetchMemos(); // Revert on error
        }
    };

    const deleteMemo = async (id) => {
        try {
            const updated = await DeleteMemo(id);
            setMemos(updated || []);
        } catch (err) {
            console.error("Failed to delete memo", err);
        }
    };

    return {
        memos,
        loading,
        addMemo,
        updateMemo,
        deleteMemo
    };
};
