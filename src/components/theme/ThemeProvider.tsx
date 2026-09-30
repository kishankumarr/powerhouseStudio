"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { MotionConfig } from "motion/react";
import { DEFAULT_THEME, THEMES, THEME_MOTION, THEME_STORAGE_KEY, type ThemeId } from "@/lib/themes";

type Origin = { x: number; y: number };

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (id: ThemeId, origin?: Origin) => void;
  motion: (typeof THEME_MOTION)[ThemeId];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(id: ThemeId) {
  const root = document.documentElement;
  root.dataset.theme = id;
  const color = THEMES.find((t) => t.id === id)?.themeColor;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta && color) meta.setAttribute("content", color);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);

  // The inline head script already applied the stored theme; sync React state to it.
  useEffect(() => {
    const current = document.documentElement.dataset.theme as ThemeId | undefined;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync with the pre-paint script
    if (current && current !== theme) setThemeState(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = useCallback(
    (id: ThemeId, origin?: Origin) => {
      if (id === theme) return;
      const root = document.documentElement;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const commit = () => {
        flushSync(() => setThemeState(id));
        applyTheme(id);
      };

      if (!reduce && typeof document.startViewTransition === "function") {
        const x = origin?.x ?? window.innerWidth / 2;
        const y = origin?.y ?? window.innerHeight / 2;
        const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        root.style.setProperty("--vt-x", `${x}px`);
        root.style.setProperty("--vt-y", `${y}px`);
        root.style.setProperty("--vt-r", `${r}px`);
        document.startViewTransition(commit);
        return;
      }

      if (!reduce) {
        root.classList.add("theme-fading");
        window.setTimeout(() => root.classList.remove("theme-fading"), 800);
      }
      commit();
    },
    [theme],
  );

  const value = useMemo(() => ({ theme, setTheme, motion: THEME_MOTION[theme] }), [theme, setTheme]);
  return (
    <ThemeContext.Provider value={value}>
      {/* Motion skips transform/layout animations for visitors who prefer reduced motion. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
