"use client";


import { clear } from 'console';
import { useCallback, useEffect, useState } from 'react'
type TimerMode = "focus" | "break";

//Time to minutes
const focusTime = 25;
const breakTime = 5;

export default function useTimer() {
    const [mode, setMode] = useState<TimerMode>('focus');
    const [timeLeft, setTimeLeft] = useState(focusTime * 60); //25 minutes in seconds
    const [isActive, setIsActive] = useState<boolean>(false);
    const [sessions, setSessions] = useState(0);

    const getDuration = useCallback((timerMode: TimerMode) => {
        return timerMode === 'focus' ? focusTime * 60 : breakTime * 60;
    }, [])

    const resetTimer = () => {
        setIsActive(false),
            setTimeLeft(getDuration(mode))
    }

    const toggleTimer = () => {
        setIsActive(prev => !prev);
    };

    const switchMode = useCallback (() => {
        const newMode = mode === 'focus' ? 'break' : 'focus';
        setMode(newMode);
        setTimeLeft(getDuration(newMode));
        setIsActive(false);

        // increment session 
        if (newMode === 'break') {
            setSessions(prev => prev + 1);
        }
    }, [mode, getDuration]);


    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                    //times up
                        clearInterval(interval!);

                    //play sound
                    try {
                        const audio = new Audio('/notification.mp3');
                        audio.play().catch((e) => console.log("Error playing sound:", e));
                    } catch (error) {
                        console.error("Error playing sound:", error);
                    }
                    }
                    return prev - 1;
                });
            }, 1000); // Decrease time every second
        } else if (interval) {
            clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive]);

    // auto switch mode when timeLeft reaches 0
    useEffect(() => {
        if (timeLeft <= 0) {
            switchMode();
        }
    }), [timeLeft, mode];

    return {
        mode,
        timeLeft,
        toggleTimer,
        isActive,
        resetTimer,
        switchMode,
        sessions
    }
}
