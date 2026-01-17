import React, { useState } from 'react';
import { Heading, Text } from '../atoms/Typography';
import { StickyNote, BookOpen, Library } from 'lucide-react';
import { StickyBoard } from '../organisms/StickyBoard';
import { FlashcardDeck } from '../organisms/FlashcardDeck';
import { useResourceLibrary } from '../../logic/useResourceLibrary';
import { ResourceGrid } from '../organisms/ResourceGrid';
import { ResourceSidebar } from '../templates/ResourceSidebar';
import { TabButton } from '../molecules/TabButton';

export const MemoPage = () => {
    const [activeTab, setActiveTab] = useState('sticky');

    const { folders, items, addFolder, updateFolder, deleteFolder, addItem, updateItem, deleteItem } = useResourceLibrary();
    const [selectedFolder, setSelectedFolder] = useState(null);

    const handleFolderClick = (folder) => {
        setSelectedFolder(folder);
    };

    const handleCloseSidebar = () => {
        setSelectedFolder(null);
    };

    const getFolderItems = (folderId) => items.filter(i => i.folderId === folderId);

    return (
        <div className="flex flex-col h-full gap-6 relative">
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-4">
                <div>
                    <Heading level={2} className="text-black mb-1">Memo & Resources</Heading>
                    <Text className="text-gray-500">Capture ideas, study, and organize files.</Text>
                </div>

                <div className="flex gap-2 mt-4 md:mt-0">
                    <TabButton
                        active={activeTab === 'sticky'}
                        onClick={() => setActiveTab('sticky')}
                        icon={StickyNote}
                        label="Sticky Notes"
                    />
                    <TabButton
                        active={activeTab === 'flashcard'}
                        onClick={() => setActiveTab('flashcard')}
                        icon={BookOpen}
                        label="Flashcards"
                    />
                    <TabButton
                        active={activeTab === 'resource'}
                        onClick={() => setActiveTab('resource')}
                        icon={Library}
                        label="Library"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-hidden relative flex flex-col">
                {activeTab === 'sticky' && <StickyBoard />}
                {activeTab === 'flashcard' && <FlashcardDeck />}
                {activeTab === 'resource' && (
                    <div className="flex-1 h-full overflow-hidden p-1 relative">
                        <ResourceGrid
                            folders={folders}
                            onFolderClick={handleFolderClick}
                            onAddFolder={addFolder}
                            onUpdateFolder={updateFolder}
                        />

                        {selectedFolder && (
                            <ResourceSidebar
                                folder={selectedFolder}
                                items={getFolderItems(selectedFolder.id)}
                                onAddItem={addItem}
                                onUpdateItem={updateItem}
                                onDeleteItem={deleteItem}
                                onDeleteFolder={(id) => { deleteFolder(id); handleCloseSidebar(); }}
                                onClose={handleCloseSidebar}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};