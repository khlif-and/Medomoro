import { useState } from 'react';
import { useFlashcards } from './useFlashcards';

export const useFlashcardDeck = () => {
    const { cards, loading, addCard, updateCard, deleteCard } = useFlashcards();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCreating, setIsCreating] = useState(false);
    const [newQ, setNewQ] = useState("");
    const [newA, setNewA] = useState("");

    const handleNext = () => {
        if (currentIndex < cards.length - 1) setCurrentIndex(currentIndex + 1);
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const handleCreate = async () => {
        if (newQ.trim() && newA.trim()) {
            await addCard(newQ, newA);
            setNewQ("");
            setNewA("");
            setIsCreating(false);
            setCurrentIndex(cards.length);
        }
    };

    return {
        cards,
        loading,
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
        currentCard: cards[currentIndex],
        totalCards: cards.length,
    };
};
