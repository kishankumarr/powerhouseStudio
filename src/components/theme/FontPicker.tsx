"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { FONTS, THEMES } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";

/** Top-bar typeface selector. Works independently of the colour theme. */
export function FontPicker() {
  const { theme, font, setFont } = useTheme();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const themeFont = THEMES.find((t) => t.id === theme)!;
  const current = FONTS.find((f) => f.id === font)!;
  const currentName = font === "theme" ? themeFont.fontName : current.name;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Typeface: ${currentName}. Change typeface`}
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 items-center gap-2 border border-line px-3 text-[0.85rem] text-fg transition-colors hover:border-fg/50 rounded-ui"
      >
        <span aria-hidden className="display text-[1.05rem] leading-none tracking-normal normal-case">
          Aa
        </span>
        <span aria-hidden className="hidden max-w-[9rem] truncate xl:inline">
          {currentName}
        </span>
        <ChevronDown
          aria-hidden
          strokeWidth={1.75}
          className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="radiogroup"
            aria-label="Typeface"
            initial={{ opacity: 0, y: -8, clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0, y: -6, clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-x-4 top-[4.25rem] z-[60] border sm:absolute sm:inset-x-auto sm:top-[calc(100%+0.6rem)] sm:right-0 sm:w-80 border-line bg-bg/95 p-2 text-fg backdrop-blur-xl rounded-[calc(var(--radius-media)+4px)]"
          >
            <p className="px-3 pt-2 pb-2 text-[0.72rem] text-muted">Typeface for headlines. Works with any theme.</p>
            <ul>
              {FONTS.map((f) => {
                const active = f.id === font;
                const family = f.family ?? themeFont.font;
                return (
                  <li key={f.id}>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => {
                        setFont(f.id);
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-fg/[0.06] rounded-[var(--radius-media)]"
                    >
                      <span
                        aria-hidden
                        className="grid size-10 shrink-0 place-items-center border border-line text-[1.15rem] leading-none"
                        style={{
                          fontFamily: family,
                          fontStretch: f.id === "saira" || (f.id === "theme" && theme === "electric") ? "62.5%" : undefined,
                          fontWeight: f.id === "syne" || f.id === "saira" ? 700 : undefined,
                          borderRadius: "calc(var(--radius-media) / 2 + 2px)",
                        }}
                      >
                        Aa
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[1rem] leading-tight" style={{ fontFamily: family }}>
                          {f.id === "theme" ? `${f.name} (${themeFont.fontName})` : f.name}
                        </span>
                        <span className="mt-0.5 block text-[0.75rem] leading-snug text-muted">{f.note}</span>
                      </span>
                      <Check aria-hidden className={`size-4 shrink-0 ${active ? "opacity-100" : "opacity-0"}`} strokeWidth={2} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
