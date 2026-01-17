import React from 'react';

export const ProgressBar = ({ progress }) => {
    // progress is 0 to 1
    return (
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-8">
            <div
                className="h-full bg-black transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${progress * 100}%` }}
            />
        </div>
    );
};
