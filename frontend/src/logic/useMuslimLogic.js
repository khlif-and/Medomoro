import { useState, useEffect } from 'react';

const TOUGH_LOVE = [
    "Neraka itu panas, sholatmu masih bolong?",
    "Sibuk mengejar dunia sampai lupa yang menciptakan dunia?",
    "Mati tidak menunggu kamu siap sholat!",
    "HP terus dipegang, Al-Quran kapan?",
    "Tinggalkan sholat = Meruntuhkan agama. Situ sehat?",
    "Ingat, kain kafan tidak ada saku untuk bawa hartamu.",
];

const SOFT_LOVE = [
    "Alhamdulillah, satu langkah lebih dekat ke Surga.",
    "Hati yang tenang ada dalam sujud.",
    "Allah tersenyum melihat hambanya yang taat.",
    "Pertahankan! Istiqomah itu berat, tapi hadiahnya Surga.",
    "Cahaya wajahmu bersinar karena wudhu.",
];

export const useMuslimLogic = () => {
    const [data, setData] = useState({
        subuh: 0, dzuhur: 0, ashar: 0, maghrib: 0, isya: 0,
        tahajud: false, dhuha: false, rawatib: 0,
        fasting: false,
        quran: { surahName: "", juz: 0, ayat: 0 },
        totalPoints: 0
    });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("neutral"); // neutral, warning, success

    const [weeklyData, setWeeklyData] = useState(() => {
        // Init with 7 days dummy to show empty chart immediately
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            days.push({ date: d.toISOString().split('T')[0], totalPoints: 0 });
        }
        return days;
    });

    const loadData = async () => {
        try {
            if (window.go && window.go.controller && window.go.controller.MuslimController) {
                const res = await window.go.controller.MuslimController.GetTodayIbadah();

                // Calculate points immediately for Today
                const currentPts = calculatePoints(res);
                res.totalPoints = currentPts;

                setData(res);

                const weekly = await window.go.controller.MuslimController.GetWeeklyStats();
                if (weekly) {
                    // Start: Override Today's stat in weekly array with realtime calculated points
                    const todayDate = res.date;
                    const updatedWeekly = weekly.map(d => {
                        if (d.date === todayDate) {
                            return { ...d, totalPoints: currentPts };
                        }
                        return d;
                    });
                    // End override
                    setWeeklyData(updatedWeekly);
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 5000); // Poll every 5s to keep dashboard sync
        return () => clearInterval(interval);
    }, []);

    const calculatePoints = (currentData) => {
        let pts = 0;
        // Wajib: OnTime=10, Late=5, Missed=-50
        [currentData.subuh, currentData.dzuhur, currentData.ashar, currentData.maghrib, currentData.isya].forEach(p => {
            if (p === 3) pts += 20; // OnTime
            else if (p === 2) pts += 5; // Late
            else if (p === 1) pts -= 50; // Missed
        });

        // Sunnah
        if (currentData.tahajud) pts += 30;
        if (currentData.dhuha) pts += 20;
        pts += (currentData.rawatib * 5);
        if (currentData.fasting) pts += 50;
        if (currentData.quran.ayat > 0) pts += 15;

        // Message Logic
        if (pts < 0) {
            setMessage(TOUGH_LOVE[Math.floor(Math.random() * TOUGH_LOVE.length)]);
            setMessageType("warning");
        } else if (pts > 50) {
            setMessage(SOFT_LOVE[Math.floor(Math.random() * SOFT_LOVE.length)]);
            setMessageType("success");
        } else {
            setMessage("Yuk semangat ibadahnya ditingkatkan lagi!");
            setMessageType("neutral");
        }

        // Update local state display only (backend calc might differ if we moved logic there, but frontend is responsive)
        setData(prev => ({ ...prev, totalPoints: pts }));
        return pts;
    };

    const updatePrayer = async (prayerName, value) => {
        const newData = { ...data, [prayerName]: value };
        // Recalc points before save
        const pts = calculatePoints(newData);
        newData.totalPoints = pts;

        setData(newData);
        await window.go.controller.MuslimController.SaveIbadah(newData);
    };

    const updateSimple = async (field, value) => {
        const newData = { ...data, [field]: value };
        const pts = calculatePoints(newData);
        newData.totalPoints = pts;

        setData(newData);
        await window.go.controller.MuslimController.SaveIbadah(newData);
    };

    const updateQuran = async (field, value) => {
        const newQuran = { ...data.quran, [field]: value };
        const newData = { ...data, quran: newQuran };
        const pts = calculatePoints(newData);
        newData.totalPoints = pts;

        setData(newData);
        await window.go.controller.MuslimController.SaveIbadah(newData);
    };

    return {
        data,
        message,
        messageType,
        updatePrayer,
        updateSimple,
        updateQuran,
        weeklyData
    };
};
