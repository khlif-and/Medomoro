export const useJournal = () => {
    const getEntries = async () => {
        try {
            return await window.go.controller.JournalController.GetEntries();
        } catch (e) {
            console.error(e);
            return [];
        }
    };

    const createEntry = async (title, content, mood) => {
        try {
            return await window.go.controller.JournalController.CreateEntry(title, content, mood);
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    const updateEntry = async (id, title, content, mood) => {
        try {
            return await window.go.controller.JournalController.UpdateEntry(id, title, content, mood);
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    const deleteEntry = async (id) => {
        try {
            await window.go.controller.JournalController.DeleteEntry(id);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    return { getEntries, createEntry, updateEntry, deleteEntry };
};
