import { useState, useEffect } from 'react';
import { GetFlashcards, AddFlashcard, UpdateFlashcard, DeleteFlashcard } from '../../wailsjs/go/controller/FlashcardController';

export const useFlashcards = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCards = async () => {
        try {
            setLoading(true);
            const data = await GetFlashcards();
            setCards(data || []);
        } catch (err) {
            console.error("Failed to fetch flashcards", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const addCard = async (question, answer) => {
        try {
            const updated = await AddFlashcard(question, answer);
            setCards(updated || []);
        } catch (err) {
            console.error("Failed to add flashcard", err);
        }
    };

    const updateCard = async (card) => {
        setCards(current => current.map(c => c.id === card.id ? card : c));
        try {
            await UpdateFlashcard(card);
        } catch (err) {
            console.error("Failed to update flashcard", err);
            fetchCards();
        }
    };

    const deleteCard = async (id) => {
        try {
            const updated = await DeleteFlashcard(id);
            setCards(updated || []);
        } catch (err) {
            console.error("Failed to delete flashcard", err);
        }
    };

    return {
        cards,
        loading,
        addCard,
        updateCard,
        deleteCard
    };
};
