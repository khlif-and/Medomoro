import React from 'react';
import { MainLayout } from '../templates/MainLayout';
import { ProfileCard } from '../organisms/ProfileCard';
import { StatsRow } from '../organisms/StatsRow';
import { ProgressSection } from '../organisms/ProgressSection';
import { TimeTracker } from '../organisms/TimeTracker';
import { OnboardingPanel } from '../organisms/OnboardingPanel';
import { CalendarSection } from '../organisms/CalendarSection';
import { WorshipTracker } from '../organisms/WorshipTracker';
import { OnboardingStats } from '../organisms/OnboardingStats';

export const DashboardPage = () => {
    return (
        <div className="flex flex-col gap-6">
            {/* Welcome Header - Moved from MainLayout for consistency */}
            <div className="flex justify-between items-end">
                <h1 className="text-4xl font-normal text-gray-900 tracking-tight">Welcome in, Nixtio</h1>
                <div className="pb-2">
                    <StatsRow />
                </div>
            </div>

            <MainLayout
                profileSection={<ProfileCard />}
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
        </div>
    );
};
