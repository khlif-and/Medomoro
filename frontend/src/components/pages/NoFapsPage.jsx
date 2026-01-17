import React, { useState } from 'react';
import { useNoFapLogic } from '../../logic/useNoFapLogic';
import { Shield, Skull, Flag, NotebookPen, Quote } from 'lucide-react';
import { Heading, Text } from '../atoms/Typography';

const NoFapsPage = () => {
    const { stats, todayLog, history, randomQuote, logDay, generateNewQuote } = useNoFapLogic();
    const [note, setNote] = useState('');
    const [view, setView] = useState('list'); // 'list' or 'form'

    const handleQuickCheck = async (status) => {
        await logDay(status, 1, note || (status === 'clean' ? 'Alhamdulillah, another clean day.' : 'Relapsed.'));
        setNote('');
    };

    return (
        <div className="flex h-full bg-white">
            {/* LEFT SIDEBAR - STATIC QUOTES & STATS */}
            <div className="w-[350px] bg-slate-50 border-r border-gray-200 p-8 flex flex-col gap-8 h-full overflow-y-auto">
                <div>
                    <Heading level={2} className="text-3xl font-black text-slate-900 leading-tight mb-2">
                        NOFAPs<br />TRACKER
                    </Heading>
                    <Text muted className="text-sm">Stay Pure. Stay Focused.</Text>
                </div>

                {/* Permanent Quote Card */}
                <div className="bg-[#1b2636] text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <Quote className="absolute top-4 right-4 opacity-20" size={40} />
                    <h3 className="text-xl font-black mb-3 text-red-400">PENGINGAT KERAS</h3>
                    <p className="font-serif italic leading-relaxed text-lg">
                        "Zina itu adalah utang. Jika engkau berutang, maka ketahuilah bahwa tebusannya adalah anggota keluargamu."
                    </p>
                    <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">- Imam Syafi'i</p>
                </div>

                {/* Dynamic Quote Card */}
                <div className="bg-white border-2 border-dashed border-gray-300 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Daily Reminder</h3>
                        <button onClick={generateNewQuote} className="text-blue-500 hover:text-blue-700 text-xs font-bold">Refresh</button>
                    </div>
                    <p className="font-medium text-slate-700 leading-relaxed">
                        "{randomQuote}"
                    </p>
                </div>

                {/* Simple Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-center">
                        <div className="text-4xl font-black text-emerald-600">{stats.currentStreak}</div>
                        <div className="text-xs font-bold text-emerald-800 uppercase mt-1">Day Streak</div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-xl border border-gray-200 text-center">
                        <div className="text-4xl font-black text-gray-600">{stats.totalClean}</div>
                        <div className="text-xs font-bold text-gray-500 uppercase mt-1">Total Clean</div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT - TASK/LIST STYLE */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header / Input Area */}
                <div className="p-8 border-b border-gray-100 bg-white z-10">
                    <Heading level={2} className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <NotebookPen className="text-slate-400" />
                        Daily Journal
                    </Heading>

                    {!todayLog.status ? (
                        <div className="flex flex-col gap-4">
                            <textarea
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-200 outline-none resize-none h-24 text-sm font-medium"
                                placeholder="Bagaimana harimu? Ada godaan? Tulis disini..."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleQuickCheck('clean')}
                                    className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-md"
                                >
                                    <Shield size={16} /> Mark as Clean
                                </button>
                                <button
                                    onClick={() => handleQuickCheck('relapse')}
                                    className="px-6 py-2 bg-white border border-gray-200 text-red-500 font-bold rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                                >
                                    <Skull size={16} /> I Relapsed
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={`p-4 rounded-xl border flex items-center justify-between ${todayLog.status === 'clean' ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'
                            }`}>
                            <div className="flex items-center gap-3">
                                {todayLog.status === 'clean' ? <Shield className="text-emerald-500" /> : <Skull className="text-red-500" />}
                                <div>
                                    <div className="font-bold text-slate-800">
                                        Status: {todayLog.status.toUpperCase()}
                                    </div>
                                    <div className="text-sm opacity-80 mt-1">
                                        "{todayLog.notes}"
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider bg-white/50 px-3 py-1 rounded-full">
                                Recorded Today
                            </span>
                        </div>
                    )}
                </div>

                {/* History List - Scrollable */}
                <div className="flex-1 overflow-y-auto p-8 bg-gray-50/30">
                    <Heading level={3} className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                        History Log
                    </Heading>

                    <div className="space-y-3">
                        {history.length === 0 ? (
                            <div className="text-center py-10 text-gray-400">Belum ada catatan. Mulai hari ini!</div>
                        ) : (
                            history.map((entry, idx) => (
                                <div key={idx} className="group bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow flex gap-4 min-h-[80px]">
                                    <div className="flex flex-col items-center gap-1 min-w-[60px] border-r border-gray-100 pr-4">
                                        <span className="text-xs font-bold text-gray-400 uppercase">
                                            {new Date(entry.date).toLocaleString('default', { month: 'short' })}
                                        </span>
                                        <span className="text-xl font-black text-slate-700">
                                            {new Date(entry.date).getDate()}
                                        </span>
                                    </div>

                                    <div className="flex-1 py-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${entry.status === 'clean' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {entry.status}
                                            </span>
                                            {/* Optional Urge Level indicator */}
                                            {entry.urgeLevel > 5 && (
                                                <span className="text-[10px] font-bold text-orange-400 flex items-center gap-1">
                                                    <Flag size={10} /> High Urge
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                                            {entry.notes || <span className="italic text-gray-300">No notes recorded.</span>}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoFapsPage;
