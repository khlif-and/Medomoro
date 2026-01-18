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

    const updateProfile = async (username, role, balance) => {
        try {
            const updated = await window.go.controller.SystemController.UpdateUserProfile(username, role, balance);
            if (updated) setUserProfile(updated);
        } catch (e) {
            console.error("Failed to update profile", e);
        }
    };

    const updateAvatar = async () => {
        try {
            const updated = await window.go.controller.SystemController.UpdateAvatar();
            if (updated) setUserProfile(updated);
        } catch (e) {
            console.error("Failed to update avatar", e);
        }
    };


    return { userProfile, sysLoading, updateProfile, updateAvatar };
};
