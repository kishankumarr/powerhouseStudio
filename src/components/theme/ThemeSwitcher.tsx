"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { THEMES } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const current = THEMES.find((t) => t.id === theme)!;

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
    <div ref={rootRef} className="fixed right-4 bottom-4 z-[70] sm:right-auto sm:bottom-6 sm:left-6">
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="radiogroup"
            aria-label="Design direction"
            initial={{ opacity: 0, y: 12, clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0, y: 8, clipPath: "inset(100% 0% 0% 0%)" }}
            transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
            className="absolute right-0 bottom-[calc(100%+0.75rem)] w-[min(22rem,calc(100vw-2rem))] sm:right-auto sm:left-0 border border-line bg-bg/95 p-2 text-fg backdrop-blur-xl rounded-[calc(var(--radius-media)+4px)]"
          >
            <p className="px-3 pt-3 pb-2 text-[0.72rem] text-muted">
              Four design directions for Powerhouse. Your pick is remembered on this device.
            </p>
            <ul>
              {THEMES.map((t, i) => {
                const active = t.id === theme;
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={(e) => setTheme(t.id, { x: e.clientX, y: e.clientY })}
                      data-cursor-hover
                      className="group flex w-full items-center gap-4 px-3 py-3 text-left transition-colors hover:bg-fg/[0.06] rounded-[var(--radius-media)]"
                    >
                      <span
                        aria-hidden
                        className="relative grid size-12 shrink-0 place-items-center overflow-hidden border border-line"
                        style={{ background: t.swatch.bg, borderRadius: "calc(var(--radius-media) / 2 + 2px)" }}
                      >
                        <span style={{ fontFamily: t.font, color: t.swatch.fg, fontSize: 20, lineHeight: 1 }}>Aa</span>
                        <span className="absolute right-1 bottom-1 size-2 rounded-full" style={{ background: t.swatch.accent }} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline gap-2">
                          <span className="text-[0.7rem] tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                          <span className="text-[1.05rem] leading-tight" style={{ fontFamily: t.font }}>
                            {t.name}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-[0.78rem] leading-snug text-muted">{t.note}</span>
                      </span>
                      <span
                        aria-hidden
                        className={`size-2.5 shrink-0 rounded-full border border-fg transition-colors ${active ? "bg-fg" : "bg-transparent"}`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        data-cursor-hover
        aria-label={`Theme: ${current.name}. Change design direction`}
        className="group flex items-center gap-3 border border-line bg-bg/80 py-2 pr-2 pl-2 text-fg backdrop-blur-xl transition-colors hover:border-fg/40 rounded-ui sm:pr-4"
      >
        <span className="flex -space-x-1.5" aria-hidden>
          {THEMES.map((t) => (
            <span
              key={t.id}
              className="size-4 rounded-full border transition-transform duration-500 group-hover:translate-x-0.5"
              style={{
                background: t.swatch.bg,
                borderColor: t.id === theme ? "var(--accent)" : "var(--line)",
                boxShadow: t.id === theme ? "0 0 0 1px var(--accent)" : undefined,
              }}
            />
          ))}
        </span>
        <span aria-hidden className="hidden text-[0.8rem] leading-none sm:inline">
          <span className="text-muted">Theme </span>
          <span style={{ fontFamily: current.font }}>{current.name}</span>
        </span>
      </button>
    </div>
  );
}
