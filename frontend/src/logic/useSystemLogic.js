import { useState, useEffect } from 'react';

export const useSystemLogic = () => {
    const [userProfile, setUserProfile] = useState({
        username: "User",
        avatar: null
    });
    const [sysLoading, setSysLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                if (window.go && window.go.controller && window.go.controller.SystemController) {
                    const profile = await window.go.controller.SystemController.GetUserProfile();
                    if (profile) {
                        setUserProfile(profile);
                    }
                }
            } catch (e) {
                console.error("Failed to load user profile", e);
            } finally {
                setSysLoading(false);
            }
        };

        loadProfile();
    }, []);

    return { userProfile, sysLoading };
};
