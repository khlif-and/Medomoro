import { Heading } from '../atoms/Typography';

export const JournalEditor = ({ entry, onSave, onCancel }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        onSave({
            id: entry?.id,
            title: fd.get('title'),
            content: fd.get('content'),
            mood: fd.get('mood')
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-8">
            <div className="border-b border-gray-100 px-8 py-5 flex items-center justify-between bg-gray-50/50">
                <Heading level={3}>{entry ? 'Edit Entry' : 'New Journal Entry'}</Heading>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
                    >
                        Save Entry
                    </button>
                </div>
            </div>

            <div className="p-8 space-y-6">
                <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-bold text-gray-700">
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        defaultValue={entry?.title}
                        placeholder="e.g., Reflections on Productivity"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 font-medium placeholder:text-gray-400"
                        autoFocus
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="mood" className="block text-sm font-bold text-gray-700">
                        How are you feeling?
                    </label>
                    <select
                        id="mood"
                        name="mood"
                        defaultValue={entry?.mood || 'neutral'}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 transition-all"
                    >
                        <option value="happy">😊 Happy & Energetic</option>
                        <option value="calm">😌 Calm & Focused</option>
                        <option value="neutral">😐 Neutral</option>
                        <option value="sad">😔 Sad or Down</option>
                        <option value="stressed">😫 Stressed</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="content" className="block text-sm font-bold text-gray-700">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        defaultValue={entry?.content}
                        placeholder="Pour your thoughts here..."
                        className="w-full h-64 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 leading-relaxed resize-y placeholder:text-gray-400"
                        required
                    />
                </div>
            </div>
        </form>
    );
};
