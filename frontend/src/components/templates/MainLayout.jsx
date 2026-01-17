export const MainLayout = ({
    profileSection,
    statsRow,
    middleSection,
    rightSection,
    bottomSection
}) => {
    return (
        <div className="font-sans">
            {/* Main Grid */}
            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Column (Profile, Menu) - 4 cols on large screens */}
                <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
                    {profileSection}

                    {/* Placeholder for expansion/menu underneath profile */}
                    <div className="bg-transparent pt-4 hidden lg:block">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                            <span className="font-medium text-gray-700">Pension contributions</span>
                            <span className="text-gray-400">▼</span>
                        </div>
                        <div className="py-4">
                            <div className="flex justify-between mb-2">
                                <span className="font-medium text-gray-800">Devices</span>
                                <span className="text-gray-400">^</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm mt-3">
                                <div className="w-10 h-8 bg-gray-800 rounded flex items-center justify-center text-white text-xs">Mac</div>
                                <div>
                                    <div className="text-sm font-bold">MacBook Air</div>
                                    <div className="text-xs text-gray-500">Version M1</div>
                                </div>
                                <div className="ml-auto">⋮</div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                            <span className="font-medium text-gray-700">Compensation Summary</span>
                            <span className="text-gray-400">▼</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                            <span className="font-medium text-gray-700">Employee Benefits</span>
                            <span className="text-gray-400">▼</span>
                        </div>
                    </div>
                </div>

                {/* Middle Column (Charts, Calendar) - 5 cols on large screens */}
                <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-auto lg:h-[340px]">
                        {middleSection}
                    </div>
                    <div>
                        {bottomSection}
                    </div>
                </div>

                {/* Right Column (Onboarding) - 3 cols on large screens */}
                <div className="col-span-1 lg:col-span-3 h-full">
                    {rightSection}
                </div>

            </div>
        </div>
    );
};
