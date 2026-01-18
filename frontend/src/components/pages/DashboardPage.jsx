import React from 'react';
import { MainLayout } from '../templates/MainLayout';
import { ProfileCard } from '../organisms/ProfileCard';

import { ProgressSection } from '../organisms/ProgressSection';
import { TimeTracker } from '../organisms/TimeTracker';
import { OnboardingPanel } from '../organisms/OnboardingPanel';
import { CalendarSection } from '../organisms/CalendarSection';
import { WorshipTracker } from '../organisms/WorshipTracker';
import { OnboardingStats } from '../organisms/OnboardingStats';

import { useSystemLogic } from '../../logic/useSystemLogic';

export const DashboardPage = () => {
    const { userProfile, sysLoading } = useSystemLogic();
    const displayName = sysLoading ? "User" : (userProfile.osUsername || userProfile.username || "User");

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-normal text-gray-900 tracking-tight mb-2">Welcome back, {displayName}</h1>

            <MainLayout
                profileSection={<ProfileCard user={userProfile} />}
                statsRow={null}
                middleSection={
                    <>
                        <ProgressSection />
                        <TimeTracker />
                    </>
                }
                bottomSection={
                    <div className="flex flex-col gap-6">
                        <WorshipTracker />
                        <CalendarSection />
                    </div>
                }
                rightSection={
                    <div className="flex flex-col gap-6">
                        <OnboardingPanel />
                        <OnboardingStats />
                    </div>
                }
            />
        </div >
    );
};
