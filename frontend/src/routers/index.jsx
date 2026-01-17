import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '../components/templates/RootLayout';
import { DashboardPage } from '../components/pages/DashboardPage';
import { TaskPage } from '../components/pages/TaskPage';
import { MemoPage } from '../components/pages/MemoPage';
import PomodoroPage from '../components/pages/PomodoroPage';
import JournalPage from '../components/pages/JournalPage';
import CalendarPage from '../components/pages/CalendarPage';
import MyMuslimPage from '../components/pages/MyMuslimPage';
import NoFapsPage from '../components/pages/NoFapsPage';
import { MiniModeProvider } from '../context/MiniModeContext';
import { PomodoroProvider } from '../context/PomodoroContext';

// Wrapper component to provide context
const RootWithProvider = () => (
    <MiniModeProvider>
        <PomodoroProvider>
            <RootLayout />
        </PomodoroProvider>
    </MiniModeProvider>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootWithProvider />,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />
            },
            {
                path: "dashboard",
                element: <DashboardPage />
            },
            {
                path: "task",
                element: <TaskPage />
            },
            {
                path: "memo",
                element: <MemoPage />
            },
            {
                path: "pomodoro",
                element: <PomodoroPage />
            },
            {
                path: "journal",
                element: <JournalPage />
            },
            {
                path: "calendar",
                element: <CalendarPage />
            },
            {
                path: "mymuslim",
                element: <MyMuslimPage />
            },
            {
                path: "nofaps",
                element: <NoFapsPage />
            }
        ]
    }
]);
