import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '../components/templates/RootLayout';
import { DashboardPage } from '../components/pages/DashboardPage';
import { TaskPage } from '../components/pages/TaskPage';
import { MemoPage } from '../components/pages/MemoPage';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
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
            }
        ]
    }
]);
