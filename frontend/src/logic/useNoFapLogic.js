import { useState, useEffect } from 'react';

const HARD_QUOTES = [
    "Zina itu utang. Jika engkau berutang, maka tebusannya adalah anggota keluargamu.",
    "Bidadari surga tidak akan mau dengan lelaki pecandu maksiat.",
    "Bayangkan Malaikat Maut mencabut nyawamu saat kamu sedang 'on'. Hina sekali.",
    "Tanganmu yang kau pakai maksiat itu, kelak akan bicara di Padang Mahsyar.",
    "Allah Maha Melihat. Kau malu pada manusia, tapi tidak malu pada Penciptamu?",
    "Sekali kau relaps, kau kembali ke nol. Capek kan mulai dari nol terus?",
    "Lelaki sejati itu bisa menahan nafsunya, bukan budak kelamin."
];

export const useNoFapLogic = () => {
    const [stats, setStats] = useState({ currentStreak: 0, longestStreak: 0, totalClean: 0, totalRelapse: 0 });
    const [todayLog, setTodayLog] = useState({ status: "", urgeLevel: 1, notes: "" });
    const [history, setHistory] = useState([]);
    const [randomQuote, setRandomQuote] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const refreshData = async () => {
        try {
            if (window.go && window.go.controller && window.go.controller.NoFapController) {
                const s = await window.go.controller.NoFapController.GetStats().catch(err => console.error("GetStats error:", err));
                const log = await window.go.controller.NoFapController.GetTodayLog().catch(err => console.error("GetTodayLog error:", err));
                const hist = await window.go.controller.NoFapController.GetEntries().catch(err => console.error("GetEntries error:", err));

                if (s) setStats(s);

                if (log && log.date) {
                    setTodayLog(log);
                } else {
                    setTodayLog({ status: "", urgeLevel: 1, notes: "" });
                }

                if (Array.isArray(hist) && hist.length > 0) {
                    // Sort descending by date
                    const sorted = [...hist].sort((a, b) => b.date.localeCompare(a.date));
                    setHistory(sorted);
                } else {
                    setHistory([]);
                }
            } else {
                console.warn("Wails controller not found");
            }
        } catch (e) {
            console.error("Critical error in refreshData:", e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshData();
        setRandomQuote(HARD_QUOTES[Math.floor(Math.random() * HARD_QUOTES.length)]);
    }, []);

    const logDay = async (status, urge, notes) => {
        try {
            if (window.go && window.go.controller && window.go.controller.NoFapController) {
                const newStats = await window.go.controller.NoFapController.LogToday(status, parseInt(urge), notes);
                setStats(newStats);
                setTodayLog({ status, urgeLevel: urge, notes });

                if (status === 'relapse') {
                    setRandomQuote("Astagfirullah! Segera mandi tobat dan perbaiki diri!");
                } else {
                    setRandomQuote("Mantap! Pertahankan, surga merindukanmu.");
                }
                await refreshData(); // Refresh history
            }
        } catch (e) {
            console.error(e);
        }
    };

    const generateNewQuote = () => {
        setRandomQuote(HARD_QUOTES[Math.floor(Math.random() * HARD_QUOTES.length)]);
    };

    return {
        stats,
        todayLog,
        history,
        randomQuote,
        isLoading,
        logDay,
        generateNewQuote
    };
};
