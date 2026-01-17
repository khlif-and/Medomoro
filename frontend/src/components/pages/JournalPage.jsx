import React, { useState, useEffect } from 'react';
import { useJournal } from '../../logic/useJournal';
import { JournalList } from '../organisms/JournalList';
import { JournalEditor } from '../organisms/JournalEditor';
import { Heading, Text } from '../atoms/Typography';

const JournalPage = () => {
    const { getEntries, createEntry, updateEntry, deleteEntry } = useJournal();
    const [entries, setEntries] = useState([]);
    const [view, setView] = useState('list'); // 'list' | 'editor'
    const [activeEntry, setActiveEntry] = useState(null);

    const loadEntries = async () => {
        const data = await getEntries();
        setEntries(data || []);
    };

    useEffect(() => {
        loadEntries();
    }, []);

    const handleCreate = () => {
        setActiveEntry(null);
        setView('editor');
    };

    const handleEdit = (entry) => {
        setActiveEntry(entry);
        setView('editor');
    };

    const handleSave = async (data) => {
        if (data.id) {
            await updateEntry(data.id, data.title, data.content, data.mood);
        } else {
            await createEntry(data.title, data.content, data.mood);
        }
        await loadEntries();
        setView('list');
    };

    const handleDelete = async (id) => {
        if (confirm('Delete this memory?')) {
            await deleteEntry(id);
            await loadEntries();
        }
    };

    return (
        <main className="container mx-auto px-4 py-8 min-h-screen">
            {view === 'list' && (
                <>
                    <div className="mb-12">
                        <Heading level={1} className="text-3xl font-bold tracking-tight text-gray-900">Personal Journal</Heading>
                        <Text muted className="mt-1">A safe space for your thoughts, reflections, and poetry.</Text>
                    </div>
                    <JournalList
                        entries={entries}
                        onCreate={handleCreate}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </>
            )}

            {view === 'editor' && (
                <div className="max-w-4xl mx-auto h-[80vh]">
                    <JournalEditor
                        entry={activeEntry}
                        onSave={handleSave}
                        onCancel={() => setView('list')}
                    />
                </div>
            )}
        </main>
    );
};

export default JournalPage;
