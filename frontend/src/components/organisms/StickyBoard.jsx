import React from 'react';
import { StickyNote } from '../molecules/StickyNote';
import { useStickyNotes } from '../../logic/useStickyNotes';
import { Button } from '../atoms/Button';
import { Plus } from 'lucide-react';
import { Heading } from '../atoms/Typography';

export const StickyBoard = () => {
    const { memos, loading, addMemo, updateMemo, deleteMemo } = useStickyNotes();

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <Heading level={3} className="text-xl">Sticky Board</Heading>
                <Button onClick={addMemo} variant="primary" className="bg-[#1b2636] text-white hover:bg-[#2c3e50] flex items-center gap-2">
                    <Plus size={16} /> Add Note
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pb-10 custom-scrollbar pr-2">
                {memos.map(memo => (
                    <StickyNote
                        key={memo.id}
                        memo={memo}
                        onUpdate={updateMemo}
                        onDelete={deleteMemo}
                    />
                ))}
            </div>
        </div>
    );
};
