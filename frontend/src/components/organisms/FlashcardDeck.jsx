import React from 'react';
import { Flashcard } from '../molecules/Flashcard';
import { useFlashcardDeck } from '../../logic/useFlashcardDeck';
import { Button } from '../atoms/Button';
import { Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import { Heading, Text } from '../atoms/Typography';

export const FlashcardDeck = () => {
    const {
        cards,
        currentIndex,
        isCreating,
        setIsCreating,
        newQ,
        setNewQ,
        newA,
        setNewA,
        handleNext,
        handlePrev,
        handleCreate,
        updateCard,
        deleteCard,
        currentCard,
        totalCards,
    } = useFlashcardDeck();

    return (
        <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto py-8">
            <div className="w-full flex justify-between items-center mb-8">
                <div>
                    <Heading level={3} className="text-xl">Flashcards</Heading>
                    <Text className="text-gray-500 text-sm">Review your knowledge</Text>
                </div>
                <Button onClick={() => setIsCreating(true)} variant="primary" className="bg-[#1b2636] text-white hover:bg-[#2c3e50] flex items-center gap-2">
                    <Plus size={16} /> New Card
                </Button>
            </div>

            {isCreating && (
                <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-lg animate-in fade-in slide-in-from-bottom-4">
                    <Heading level={4} className="mb-4">Create New Card</Heading>
                    <div className="flex flex-col gap-4">
                        <input
                            className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2526]"
                            placeholder="Question"
                            value={newQ}
                            onChange={(e) => setNewQ(e.target.value)}
                        />
                        <textarea
                            className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2526] resize-none h-24"
                            placeholder="Answer"
                            value={newA}
                            onChange={(e) => setNewA(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
                            <Button variant="primary" onClick={handleCreate}>Add Card</Button>
                        </div>
                    </div>
                </div>
            )}

            {totalCards === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    No flashcards yet. Create one to start studying!
                </div>
            ) : (
                <div className="w-full flex flex-col gap-6">
                    <Flashcard
                        card={currentCard}
                        onUpdate={updateCard}
                        onDelete={deleteCard}
                    />

                    <div className="flex items-center justify-between mt-4">
                        <Button
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            variant="icon"
                            className="bg-white shadow-sm disabled:opacity-50"
                        >
                            <ArrowLeft size={20} />
                        </Button>

                        <span className="text-sm font-medium text-gray-400 font-mono">
                            {currentIndex + 1} / {totalCards}
                        </span>

                        <Button
                            onClick={handleNext}
                            disabled={currentIndex === totalCards - 1}
                            variant="icon"
                            className="bg-white shadow-sm disabled:opacity-50"
                        >
                            <ArrowRight size={20} />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
