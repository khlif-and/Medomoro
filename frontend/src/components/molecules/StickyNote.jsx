import React, { useState, useEffect, useRef } from 'react';
import { Trash2, MoreHorizontal } from 'lucide-react';

export const StickyNote = ({ memo, onUpdate, onDelete }) => {
    const [content, setContent] = useState(memo.content);
    const textareaRef = useRef(null);

    // Auto-save debounce effect
    useEffect(() => {
        const timer = setTimeout(() => {
            if (content !== memo.content) {
                onUpdate({ ...memo, content });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [content, memo, onUpdate]);

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleColorChange = (color) => {
        onUpdate({ ...memo, color });
    };

    const colors = ['#FEE2E2', '#FEF3C7', '#D1FAE5', '#DBEAFE', '#F3E8FF'];

    return (
        <div
            className="rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group relative h-[250px] animate-in zoom-in-95"
            style={{ backgroundColor: memo.color }}
        >
            <textarea
                ref={textareaRef}
                className="flex-1 w-full bg-transparent resize-none focus:outline-none text-gray-700 placeholder-gray-400 font-medium text-lg leading-relaxed custom-scrollbar"
                placeholder="Type something..."
                value={content}
                onChange={handleChange}
            />

            <div className="flex justify-between items-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1">
                    {colors.map(c => (
                        <button
                            key={c}
                            className={`w-4 h-4 rounded-full border border-black/10 transition-transform hover:scale-110 ${memo.color === c ? 'ring-1 ring-offset-1 ring-gray-400' : ''}`}
                            style={{ backgroundColor: c }}
                            onClick={() => handleColorChange(c)}
                        />
                    ))}
                </div>

                <button
                    onClick={() => onDelete(memo.id)}
                    className="p-1.5 hover:bg-black/5 rounded-full text-gray-500 hover:text-red-500 transition-colors"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};
