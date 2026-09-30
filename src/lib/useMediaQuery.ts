"use client";

import { useSyncExternalStore } from "react";

/** SSR-safe media query hook; returns `fallback` on the server and first render. */
export function useMediaQuery(query: string, fallback = false) {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => fallback,
  );
}

/** Hydration-safe reduced-motion flag: false on the server and first paint, then the real value. */
export function useReducedMotionSafe() {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}
