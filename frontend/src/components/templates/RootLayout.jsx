import { Outlet } from 'react-router-dom';
import { TitleBar } from '../atoms/TitleBar';
import { TopNav } from '../organisms/TopNav';

export const RootLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            <TitleBar />
            <div className="flex-1 relative overflow-hidden bg-[#F9F8F4]">
                <TopNav />
                <div className="absolute inset-0 overflow-y-scroll pt-20 pb-10 px-8">
                    <div className="max-w-[1600px] mx-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};
