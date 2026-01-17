export const usePomodoroStats = () => {
    // This hook will rely on the global window.go.adapter.controller.PomodoroController
    // Since Wails bindings are asynchronous, we'll wrap them here.

    // Note: Wails automatically generates JS bindings. 
    // We assume window.go.test.internal.adapter.controller.PomodoroController exists after build.
    // For Dev without full rebuild, we might need to mock or ensure wails dev is running.

    const getStats = async () => {
        try {
            return await window.go.controller.PomodoroController.GetPomodoroData();
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    const recordSession = async (minutes) => {
        try {
            return await window.go.controller.PomodoroController.RecordSession(minutes);
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    return { getStats, recordSession };
};
