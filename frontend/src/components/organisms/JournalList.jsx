import { Trash2, Edit2, Calendar, ChevronRight } from 'lucide-react';
import { Heading, Text } from '../atoms/Typography';

export const JournalList = ({ entries, onEdit, onDelete, onCreate }) => {
    if (!entries || entries.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center gap-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400">
                    <Edit2 size={24} />
                </div>
                <div>
                    <Heading level={3} className="text-gray-900">No entries yet</Heading>
                    <Text muted className="mt-1">Write your first thought today.</Text>
                </div>
                <button
                    onClick={onCreate}
                    className="mt-2 px-6 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Create Entry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-6">
                <Heading level={2}>My Entries</Heading>
                <button
                    onClick={onCreate}
                    className="px-6 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
                >
                    + New Entry
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100 overflow-hidden">
                {entries.map(entry => (
                    <div
                        key={entry.id}
                        className="group flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => onEdit(entry)}
                    >
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-500">
                            <span className="text-xs font-bold uppercase">{new Date(entry.created_at).toLocaleString('default', { month: 'short' })}</span>
                            <span className="text-lg font-bold leading-none">{new Date(entry.created_at).getDate()}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                {entry.title || 'Untitled'}
                            </h4>
                            <p className="text-sm text-gray-500 truncate">
                                {entry.content}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={(e) => { e.stopPropagation(); onDelete(entry.id); }}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                title="Delete"
                            >
                                <Trash2 size={16} />
                            </button>
                            <ChevronRight size={16} className="text-gray-300" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
