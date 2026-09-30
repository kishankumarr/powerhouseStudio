import { Bodoni_Moda, Hanken_Grotesk, Instrument_Serif, Inter_Tight, Saira } from "next/font/google";

// Cinematic (default theme) fonts are preloaded; the other theme faces load on demand.
export const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  style: ["normal", "italic"],
  display: "swap",
});

export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
  preload: false,
});

export const saira = Saira({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-saira",
  display: "swap",
  preload: false,
});

export const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  preload: false,
});

export const fontVariables = [bodoni, hanken, instrument, saira, interTight].map((f) => f.variable).join(" ");
