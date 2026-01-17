import { useState, useRef, useEffect } from 'react';

export const useMusicPlayer = () => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [isRepeat, setIsRepeat] = useState(false);

    const audioRef = useRef(new Audio());

    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = volume;

        const handleEnded = () => {
            if (isRepeat) {
                audio.currentTime = 0;
                audio.play();
            } else {
                setIsPlaying(false);
            }
        };

        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.pause();
            if (currentTrack?.url) {
                URL.revokeObjectURL(currentTrack.url);
            }
        };
    }, [isRepeat]);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (currentTrack?.url) {
                URL.revokeObjectURL(currentTrack.url);
            }

            const url = URL.createObjectURL(file);
            setCurrentTrack({
                name: file.name,
                url: url
            });

            audioRef.current.src = url;
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const togglePlay = () => {
        if (!currentTrack) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
    };

    const toggleRepeat = () => setIsRepeat(!isRepeat);

    return {
        currentTrack,
        isPlaying,
        volume,
        isRepeat,
        handleFileUpload,
        togglePlay,
        handleVolumeChange,
        toggleRepeat
    };
};
