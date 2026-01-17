import React from 'react';
import { Heading, Text } from '../atoms/Typography';
import { useMuslimLogic } from '../../logic/useMuslimLogic';
import { Heart, Star, BookOpen, Sun, Moon, AlertTriangle, ShieldCheck, Flame, Info } from 'lucide-react';

const PrayerCard = ({ name, value, onChange }) => {
    return (
        <div className={`p-4 rounded-xl border-2 transition-all ${value === 3 ? 'bg-emerald-50 border-emerald-500 shadow-emerald-100' :
                value === 1 ? 'bg-red-50 border-red-500 shadow-red-100' :
                    'bg-white border-gray-100'
            } shadow-sm hover:shadow-md`}>
            <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-lg uppercase tracking-wider">{name}</span>
                {value === 3 && <Star className="text-emerald-500 fill-emerald-500" size={16} />}
                {value === 1 && <AlertTriangle className="text-red-500" size={16} />}
            </div>
            <div className="flex gap-1">
                <button
                    onClick={() => onChange(3)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${value === 3 ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                >
                    ON TIME
                </button>
                <button
                    onClick={() => onChange(2)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${value === 2 ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                >
                    LATE
                </button>
                <button
                    onClick={() => onChange(1)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${value === 1 ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                >
                    MISSED
                </button>
            </div>
        </div>
    );
};

const MyMuslimPage = () => {
    const { data, message, messageType, updatePrayer, updateSimple, updateQuran } = useMuslimLogic();

    return (
        <main className="container mx-auto px-4 py-8 pb-20 max-w-6xl">
            {/* Header Section - RAME */}
            <div className="mb-10 text-center relative overflow-hidden bg-gradient-to-r from-[#1b2636] to-[#2c3e50] rounded-3xl p-10 text-white shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>

                <Heading level={1} className="text-5xl font-black tracking-tight mb-2 relative z-10">
                    JANNAL TRACKER
                </Heading>
                <Text className="text-blue-200 font-medium relative z-10 text-lg">
                    "Sesungguhnya sholat itu mencegah dari perbuatan keji dan mungkar."
                </Text>

                <div className="mt-8 transform scale-110">
                    <div className={`inline-flex items-center gap-4 px-8 py-4 rounded-full border-4 ${messageType === 'warning' ? 'bg-red-600 border-red-800' : 'bg-emerald-600 border-emerald-800'
                        } shadow-xl animate-bounce-slow`}>
                        <span className="text-4xl font-black">{data.totalPoints}</span>
                        <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Points Today</span>
                    </div>
                </div>

                {message && (
                    <div className={`mt-6 mx-auto max-w-2xl px-6 py-3 rounded-xl font-bold text-lg shadow-lg border-2 ${messageType === 'warning' ? 'bg-red-500/20 border-red-500 text-red-200' : 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                        }`}>
                        {messageType === 'warning' ? '🔥' : '✨'} {message}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Essential Prayers */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                <ShieldCheck size={20} />
                            </div>
                            <Heading level={2} className="text-2xl font-bold">Wajib 5 Waktu</Heading>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <PrayerCard name="Subuh" value={data.subuh} onChange={(v) => updatePrayer('subuh', v)} />
                            <PrayerCard name="Dzuhur" value={data.dzuhur} onChange={(v) => updatePrayer('dzuhur', v)} />
                            <PrayerCard name="Ashar" value={data.ashar} onChange={(v) => updatePrayer('ashar', v)} />
                            <PrayerCard name="Maghrib" value={data.maghrib} onChange={(v) => updatePrayer('maghrib', v)} />
                            <PrayerCard name="Isya" value={data.isya} onChange={(v) => updatePrayer('isya', v)} />
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                                <BookOpen size={20} />
                            </div>
                            <Heading level={2} className="text-2xl font-bold">Quran Journal</Heading>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Surah</label>
                                <input
                                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold focus:border-purple-500 outline-none"
                                    placeholder="e.g. Al-Mulk"
                                    value={data.quran.surahName}
                                    onChange={(e) => updateQuran('surahName', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Juz</label>
                                <input
                                    type="number"
                                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold focus:border-purple-500 outline-none"
                                    placeholder="1-30"
                                    value={data.quran.juz || ''}
                                    onChange={(e) => updateQuran('juz', parseInt(e.target.value))}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Ayat</label>
                                <input
                                    type="number"
                                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold focus:border-purple-500 outline-none"
                                    placeholder="Total read"
                                    value={data.quran.ayat || ''}
                                    onChange={(e) => updateQuran('ayat', parseInt(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Sunnah & Extras */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-8 text-white shadow-lg transform hover:-translate-y-1 transition-transform">
                        <div className="flex items-center justify-between mb-4">
                            <Heading level={3} className="font-bold text-xl">Daily Sunnah</Heading>
                            <Sun className="animate-spin-slow" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer" onClick={() => updateSimple('tahajud', !data.tahajud)}>
                                <span className="font-bold">Tahajud</span>
                                <div className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${data.tahajud ? 'bg-white text-orange-500' : ''}`}>
                                    {data.tahajud && <CheckIcon />}
                                </div>
                            </div>
                            <div className="flex items-center justify-between bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer" onClick={() => updateSimple('dhuha', !data.dhuha)}>
                                <span className="font-bold">Dhuha</span>
                                <div className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${data.dhuha ? 'bg-white text-orange-500' : ''}`}>
                                    {data.dhuha && <CheckIcon />}
                                </div>
                            </div>
                            <div className="flex items-center justify-between bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer" onClick={() => updateSimple('fasting', !data.fasting)}>
                                <span className="font-bold flex items-center gap-2"><Flame size={16} /> Puasa Sunnah</span>
                                <div className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${data.fasting ? 'bg-white text-orange-500' : ''}`}>
                                    {data.fasting && <CheckIcon />}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <Heading level={3} className="font-bold text-xl mb-4 text-gray-800">Rawatib Tracker</Heading>
                        <div className="flex items-center justify-center gap-4">
                            <button onClick={() => updateSimple('rawatib', Math.max(0, data.rawatib - 1))} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold hover:bg-gray-200">-</button>
                            <div className="text-4xl font-black text-[#1b2636] w-16 text-center">{data.rawatib}</div>
                            <button onClick={() => updateSimple('rawatib', data.rawatib + 1)} className="w-10 h-10 rounded-full bg-[#1b2636] text-white flex items-center justify-center text-xl font-bold hover:bg-gray-800">+</button>
                        </div>
                        <Text muted className="text-center mt-2 text-xs">Total Rakaat Sunnah Rawatib</Text>
                    </div>

                    <div className="bg-blue-50 rounded-3xl p-6 border-2 border-blue-100">
                        <div className="flex gap-3">
                            <Info className="text-blue-500 flex-shrink-0" />
                            <Text className="text-sm text-blue-800 font-medium leading-relaxed">
                                "Amalan yang pertama kali dihisab pada hari kiamat adalah sholat."
                                <br /><span className="opacity-60 text-xs mt-1 block">- HR. Abu Daud</span>
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export default MyMuslimPage;
