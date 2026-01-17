import React from 'react';
import { Check, BookOpen, Flame } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { useMuslimLogic } from '../../logic/useMuslimLogic';

const PrayerItem = ({ name, isDone, type = "fardhu", onToggle }) => {
    return (
        <div
            className={`flex items-center justify-between p-3 rounded-xl border mb-2 transition-all cursor-pointer ${isDone
                ? 'bg-[#1b2636]/5 border-[#1b2636]/10'
                : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
                }`}
            onClick={onToggle}
        >
            <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${isDone ? 'bg-[#1b2636] border-[#1b2636]' : 'border-gray-300'
                    }`}>
                    {isDone && <Check size={14} className="text-white" />}
                </div>
                <div>
                    <h4 className={`font-medium text-sm ${isDone ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                        {name}
                    </h4>
                    {type === "sunnah" && <span className="text-[10px] text-amber-600 font-medium bg-amber-50 px-1.5 py-0.5 rounded">Sunnah</span>}
                </div>
            </div>
            <div className="text-xs text-gray-400 font-medium">
                {isDone ? '+20 pts' : 'Pending'}
            </div>
        </div>
    );
};

export const WorshipTracker = () => {
    // Migrate to useMuslimLogic directly
    const { data, updatePrayer, weeklyData } = useMuslimLogic();
    const [activeTab, setActiveTab] = React.useState('daily');

    // Mappers for UI
    const prayersFardhu = [
        { id: 'subuh', name: 'Subuh', isDone: data.subuh === 3 },
        { id: 'dzuhur', name: 'Dzuhur', isDone: data.dzuhur === 3 },
        { id: 'ashar', name: 'Ashar', isDone: data.ashar === 3 },
        { id: 'maghrib', name: 'Maghrib', isDone: data.maghrib === 3 },
        { id: 'isya', name: 'Isya', isDone: data.isya === 3 },
    ];

    const prayersSunnah = [
        { id: 'dhuha', name: 'Dhuha', isDone: data.dhuha },
        { id: 'tahajud', name: 'Tahajjud', isDone: data.tahajud },
    ];

    const handleToggle = (type, id) => {
        if (type === 'fardhu') {
            // Logic: if 3 (done/ontime), set to 0? Or toggle between 0 and 3?
            // Assuming simple toggle for dashboard: 3 -> 0, 0 -> 3
            updatePrayer(id, data[id] === 3 ? 0 : 3);
        } else {
            // Sunnah is bool
            updatePrayer(id, !data[id]);
        }
    };

    // Chart Data Mapper
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const chartData = weeklyData.map(d => {
        const date = new Date(d.date);
        return {
            name: days[date.getDay()],
            score: d.totalPoints || 0
        };
    });

    return (
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                        <Flame className="text-orange-500 fill-orange-500" size={20} />
                        Worship Tracker
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Keep your spiritual streak alive</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-full">
                    <button
                        onClick={() => setActiveTab('daily')}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === 'daily' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Daily Check
                    </button>
                    <button
                        onClick={() => setActiveTab('stats')}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === 'stats' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Statistics
                    </button>
                </div>
            </div>

            {activeTab === 'daily' && (
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Fardhu Prayers</h4>
                        {prayersFardhu.map(p => (
                            <PrayerItem
                                key={p.id}
                                name={p.name}
                                isDone={p.isDone}
                                onToggle={() => handleToggle('fardhu', p.id)}
                            />
                        ))}
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Sunnah & Ibadah</h4>
                        {prayersSunnah.map(p => (
                            <PrayerItem
                                key={p.id}
                                name={p.name}
                                isDone={p.isDone}
                                type="sunnah"
                                onToggle={() => handleToggle('sunnah', p.id)}
                            />
                        ))}
                        <div className="bg-gradient-to-br from-[#1b2636] to-[#2c3e50] rounded-xl p-4 text-white mt-1 relative overflow-hidden group cursor-pointer">
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="bg-white/20 p-1.5 rounded-lg">
                                        <BookOpen size={16} className="text-white" />
                                    </div>
                                    <span className="text-xs font-medium bg-white/10 px-2 py-1 rounded">Juz {data.quran.juz || 1}</span>
                                </div>
                                <h4 className="font-bold mb-1">Read Al-Quran</h4>
                                <p className="text-xs text-gray-300 mb-3">{data.quran.surahName || "Continue Reading"}</p>
                                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                                    {/* Simple visual progress based on Ayat? Assuming max 100 for visual */}
                                    <div className="bg-emerald-400 h-full" style={{ width: `${Math.min(data.quran.ayat || 0, 100)}%` }}></div>
                                </div>
                            </div>
                            <div className="absolute -right-2 -bottom-4 opacity-10 transform rotate-12 group-hover:scale-110 transition-transform">
                                <BookOpen size={80} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'stats' && (
                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                            />
                            <Tooltip
                                cursor={{ fill: '#f9fafb' }}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                                formatter={(value) => [`${value} Pts`, 'Score']}
                            />
                            <Bar
                                dataKey="score"
                                radius={[6, 6, 6, 6]}
                                barSize={40}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.score < 0 ? '#ef4444' : '#1b2636'} // Red-500 if negative, else Dark
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};
