// src/hooks/useTheme.js
import { useState, useEffect } from 'react';

export function useTheme() {
  // Defaulting to true (Dark Mode)
  const[isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return { isDark, toggleTheme };
}