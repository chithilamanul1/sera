'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type GlowTheme = 'silver' | 'green' | 'gold' | 'red';

interface ThemeStore {
    glowTheme: GlowTheme;
    setGlowTheme: (theme: GlowTheme) => void;
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            glowTheme: 'silver',
            setGlowTheme: (theme) => set({ glowTheme: theme }),
        }),
        {
            name: 'seranex-theme',
        }
    )
);

// Theme colors mapping
export const glowColors = {
    silver: '#FFFFFF',
    green: '#00FF41',
    gold: '#FFD700',
    red: '#FF0040',
};

export const glowNames = {
    silver: 'Starlight Silver',
    green: 'Matrix Green',
    gold: 'Royal Gold',
    red: 'Cyber Red',
};
