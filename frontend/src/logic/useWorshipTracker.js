import { useState } from 'react';

const WEEKLY_STATS = [
    { name: 'Mon', score: 85 },
    { name: 'Tue', score: 92 },
    { name: 'Wed', score: 78 },
    { name: 'Thu', score: 95 },
    { name: 'Fri', score: 100 },
    { name: 'Sat', score: 88 },
    { name: 'Sun', score: 90 },
];

const DEFAULT_PRAYERS = {
    fardhu: [
        { id: 'subuh', name: 'Subuh', isDone: true },
        { id: 'dzuhur', name: 'Dzuhur', isDone: true },
        { id: 'ashar', name: 'Ashar', isDone: false },
        { id: 'maghrib', name: 'Maghrib', isDone: false },
        { id: 'isya', name: 'Isya', isDone: false },
    ],
    sunnah: [
        { id: 'dhuha', name: 'Dhuha', isDone: true },
        { id: 'tahajjud', name: 'Tahajjud', isDone: false },
    ],
};

export const useWorshipTracker = () => {
    const [activeTab, setActiveTab] = useState('daily');
    const [prayers, setPrayers] = useState(DEFAULT_PRAYERS);

    const togglePrayer = (type, id) => {
        setPrayers(prev => ({
            ...prev,
            [type]: prev[type].map(p =>
                p.id === id ? { ...p, isDone: !p.isDone } : p
            ),
        }));
    };

    const getCompletedCount = () => {
        const fardhuDone = prayers.fardhu.filter(p => p.isDone).length;
        const sunnahDone = prayers.sunnah.filter(p => p.isDone).length;
        return { fardhuDone, sunnahDone, total: fardhuDone + sunnahDone };
    };

    return {
        activeTab,
        setActiveTab,
        prayers,
        togglePrayer,
        weeklyStats: WEEKLY_STATS,
        completedCount: getCompletedCount(),
    };
};
