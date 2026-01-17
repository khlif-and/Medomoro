import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { RotateCcw, Trash2, Edit2 } from 'lucide-react';

export const Flashcard = ({ card, onUpdate, onDelete }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [question, setQuestion] = useState(card.question);
    const [answer, setAnswer] = useState(card.answer);

    const handleFlip = () => {
        if (!isEditing) setIsFlipped(!isFlipped);
    };

    const handleSave = () => {
        onUpdate({ ...card, question, answer });
        setIsEditing(false);
    };

    return (
        <div className="relative group perspective-1000 w-full h-[300px] cursor-pointer" onClick={handleFlip}>
            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
            `}</style>

            <div className={`relative w-full h-full text-center transition-transform duration-700 transform-style-3d shadow-md hover:shadow-xl rounded-2xl ${isFlipped ? 'rotate-y-180' : ''}`}>

                {/* Front (Question) */}
                <div className="absolute w-full h-full backface-hidden bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center">
                    <span className="absolute top-4 left-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Question</span>
                    {isEditing ? (
                        <div className="w-full h-full flex flex-col gap-4 pt-6" onClick={(e) => e.stopPropagation()}>
                            <textarea
                                className="w-full h-24 bg-gray-50 p-2 rounded text-sm resize-none border border-gray-200"
                                placeholder="Enter Question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                            <textarea
                                className="w-full h-24 bg-gray-50 p-2 rounded text-sm resize-none border border-gray-200"
                                placeholder="Enter Answer (Hidden)"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                            <Button onClick={handleSave} size="sm" variant="primary">Save</Button>
                        </div>
                    ) : (
                        <p className="text-xl font-medium text-gray-800 leading-relaxed">{card.question}</p>
                    )}
                </div>

                {/* Back (Answer) */}
                <div className="absolute w-full h-full backface-hidden bg-[#1b2636] text-white rounded-2xl p-8 flex flex-col items-center justify-center rotate-y-180">
                    <span className="absolute top-4 left-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Answer</span>
                    <p className="text-xl font-medium leading-relaxed">{card.answer}</p>
                </div>
            </div>

            {/* Actions */}
            {!isEditing && (
                <div className="absolute bottom-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-blue-600 transition-colors"
                        title="Edit"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(card.id)}
                        className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-red-500 transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};
