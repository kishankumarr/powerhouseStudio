export const THEMES = [
  {
    id: "cinematic",
    name: "Cinematic",
    note: "Black, bone and a single beam of Powerhouse yellow.",
    swatch: { bg: "#000000", fg: "#F2EEE6", accent: "#FFE903" },
    font: "var(--font-bodoni)",
    themeColor: "#000000",
  },
  {
    id: "editorial",
    name: "Editorial",
    note: "Warm paper, serif headlines, magazine rhythm.",
    swatch: { bg: "#ECE5D6", fg: "#16130F", accent: "#FFE903" },
    font: "var(--font-instrument)",
    themeColor: "#ECE5D6",
  },
  {
    id: "electric",
    name: "Electric",
    note: "Stage lights, condensed type, full voltage.",
    swatch: { bg: "#06060C", fg: "#F5F5F0", accent: "#FFE903" },
    font: "var(--font-saira)",
    themeColor: "#06060C",
  },
  {
    id: "minimal",
    name: "Minimal",
    note: "White space, precise type, images first.",
    swatch: { bg: "#FAFAF7", fg: "#0A0A0A", accent: "#FFE903" },
    font: "var(--font-inter-tight)",
    themeColor: "#FAFAF7",
  },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
export const DEFAULT_THEME: ThemeId = "cinematic";
export const THEME_STORAGE_KEY = "ph-theme";

/** Per-theme motion character: cinematic is slow, electric is snappy. */
export const THEME_MOTION: Record<ThemeId, { duration: number; ease: [number, number, number, number] }> = {
  cinematic: { duration: 1.2, ease: [0.19, 1, 0.22, 1] },
  editorial: { duration: 0.95, ease: [0.25, 1, 0.5, 1] },
  electric: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  minimal: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
};

/** Runs before first paint so the stored theme never flashes. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(["cinematic","editorial","electric","minimal"].indexOf(t)>-1){document.documentElement.dataset.theme=t}}catch(e){}})();`;
