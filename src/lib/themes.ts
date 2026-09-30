export const THEMES = [
  {
    id: "cinematic",
    fontName: "Bodoni Moda",
    name: "Cinematic",
    note: "Black, bone and a single beam of Powerhouse yellow.",
    swatch: { bg: "#000000", fg: "#F2EEE6", accent: "#FFE903" },
    font: "var(--font-bodoni)",
    themeColor: "#000000",
  },
  {
    id: "editorial",
    fontName: "Instrument Serif",
    name: "Editorial",
    note: "Warm paper, serif headlines, magazine rhythm.",
    swatch: { bg: "#ECE5D6", fg: "#16130F", accent: "#FFE903" },
    font: "var(--font-instrument)",
    themeColor: "#ECE5D6",
  },
  {
    id: "electric",
    fontName: "Saira Condensed",
    name: "Electric",
    note: "Stage lights, condensed type, full voltage.",
    swatch: { bg: "#06060C", fg: "#F5F5F0", accent: "#FFE903" },
    font: "var(--font-saira)",
    themeColor: "#06060C",
  },
  {
    id: "minimal",
    fontName: "Inter Tight",
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

/**
 * Typeface presets, chosen independently of the colour theme. "theme" keeps each
 * theme's own pairing; the others override the display and body faces (see globals.css).
 */
export const FONTS = [
  { id: "theme", name: "Match theme", note: "Each theme's own pairing", family: null },
  { id: "bodoni", name: "Bodoni Moda", note: "High-contrast fashion serif", family: "var(--font-bodoni)" },
  { id: "instrument", name: "Instrument Serif", note: "Soft editorial serif", family: "var(--font-instrument)" },
  { id: "syne", name: "Syne", note: "Wide, expressive studio grotesk", family: "var(--font-syne)" },
  { id: "saira", name: "Saira Condensed", note: "Tall poster type", family: "var(--font-saira)" },
  { id: "inter", name: "Inter Tight", note: "Clean and precise", family: "var(--font-inter-tight)" },
] as const;

export type FontId = (typeof FONTS)[number]["id"];
export const DEFAULT_FONT: FontId = "theme";
export const FONT_STORAGE_KEY = "ph-font";

/** Runs before first paint so the stored theme and typeface never flash. */
export const themeInitScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("${THEME_STORAGE_KEY}"),f=localStorage.getItem("${FONT_STORAGE_KEY}");if(["cinematic","editorial","electric","minimal"].indexOf(t)>-1){d.dataset.theme=t}if(["bodoni","instrument","syne","saira","inter"].indexOf(f)>-1){d.dataset.font=f}}catch(e){}})();`;
