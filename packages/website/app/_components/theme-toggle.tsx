"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-8 h-8" />; // Placeholder to prevent layout shift
    }

    return (
        <button
            onClick={() => {
                if (theme === 'system') setTheme('dark');
                else if (theme === 'dark') setTheme('light');
                else setTheme('system');
            }}
            className="relative p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center justify-center w-8 h-8"
            title="Toggle Theme"
        >
            {theme === 'system' ? (
                <span className="font-semibold text-[10px] leading-none uppercase tracking-wider">Sys</span>
            ) : theme === 'dark' ? (
                <Moon className="h-4 w-4" />
            ) : (
                <Sun className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
