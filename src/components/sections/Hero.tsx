"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { useTheme } from "@/components/theme/ThemeProvider";
import { media } from "@/content/media";
import { site } from "@/content/site";

const CYCLE_MS = 5200;
const CHAPTERS = ["Create", "Connect", "Build"];

/** Live timecode since page load, written straight to the DOM to avoid re-renders. */
function Timecode() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const pad = (n: number) => String(n).padStart(2, "0");
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const f = Math.floor((t % 1) * 24);
      const s = Math.floor(t) % 60;
      const mnt = Math.floor(t / 60) % 60;
      const h = Math.floor(t / 3600);
      if (ref.current) ref.current.textContent = `${pad(h)}:${pad(mnt)}:${pad(s)}:${pad(f)}`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <span ref={ref} className="tabular-nums">
      00:00:00:00
    </span>
  );
}

function Corners() {
  const c = "absolute size-5 border-white/70 sm:size-7";
  return (
    <motion.div
      aria-hidden
      className="hero-corners pointer-events-none absolute inset-x-3 top-[4.25rem] bottom-3 sm:inset-x-5 sm:top-[5.75rem] sm:bottom-5"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, delay: 1.1, ease: [0.19, 1, 0.22, 1] }}
    >
      <span className={`${c} top-0 left-0 border-t border-l`} />
      <span className={`${c} top-0 right-0 border-t border-r`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} right-0 bottom-0 border-r border-b`} />
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { motion: m, theme } = useTheme();
  const frameSizes = theme === "editorial" ? "(min-width: 1024px) 34vw, 100vw" : "100vw";
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % media.hero.length), CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [active, paused]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const frameY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="hero relative isolate min-h-[100svh] overflow-hidden" aria-label="Introduction">
      {/* Image frame: full-bleed in dark themes, framed in light themes (see globals.css). */}
      <motion.div
        className="hero-frame overflow-hidden rounded-media"
        style={reduce ? undefined : { y: frameY, scale: frameScale }}
        initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" }}
        animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reduce ? 1.04 : 1.2 }}
              animate={{ scale: 1.04 }}
              transition={{ duration: reduce ? 0 : CYCLE_MS / 1000 + 1.6, ease: "linear" }}
            >
              <Media asset={media.hero[active]} sizes={frameSizes} preload={active === 0} />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div aria-hidden className="hero-shade absolute inset-0" />
        <Corners />

        <motion.div
          aria-hidden
          className="hero-hud absolute top-20 right-5 left-5 flex items-start justify-between text-[0.7rem] tracking-[0.08em] text-white/85 sm:top-28 sm:right-9 sm:left-9 sm:text-[0.75rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <span className="flex items-center gap-2">
            <span className="rec-dot size-2 rounded-full bg-[#ff3b30]" />
            <span>REC</span>
            <Timecode />
          </span>
          <span className="hidden text-right sm:block">
            {site.location.city}, {site.location.region}
            <br />
            <span className="text-white/60">{site.location.coords}</span>
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-content relative z-10 mx-auto flex min-h-[100svh] max-w-[1680px] flex-col px-4 sm:px-8 lg:px-12"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <h1 className="display t-hero hero-title">
          <span className="sr-only">Powerhouse Studios, creative and production company in Mangaluru. </span>
          {site.promise.map((line, i) => (
            <span
              key={line}
              className={`-mx-[0.1em] -mb-[0.06em] block overflow-hidden px-[0.1em] pb-[0.06em] transition-opacity duration-1000 ${active === i ? "opacity-100" : "opacity-30"}`}
            >
              <motion.span
                className="block"
                initial={reduce ? { opacity: 0 } : { y: "110%" }}
                animate={reduce ? { opacity: 1 } : { y: "0%" }}
                transition={{ duration: m.duration * 1.2, ease: m.ease, delay: 0.55 + i * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="hero-foot mt-8 flex flex-col gap-8 sm:mt-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: m.duration, ease: m.ease, delay: 1.15 }}
            className="max-w-xl"
          >
            <p className="lede text-fg/85">
              Content, social media, video, photography, events and a working studio, under one roof in Mangaluru.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href="/contact">Start a project</Button>
              <Button href="/work" variant="text" magnetic={false}>
                See the work
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="flex items-end gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div role="tablist" aria-label="Hero images" className="flex gap-4">
              {CHAPTERS.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-label={`Show image ${i + 1}: ${site.promise[i]}`}
                  onClick={() => setActive(i)}
                  className="group w-16 pt-3 text-left text-[0.72rem] text-fg/70 sm:w-20"
                >
                  <span className="relative block h-px w-full bg-fg/25">
                    {active === i && (
                      <motion.span
                        key={`${active}-${paused}`}
                        className="absolute inset-y-0 left-0 block bg-fg"
                        initial={{ width: paused ? "100%" : "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: paused ? 0 : CYCLE_MS / 1000, ease: "linear" }}
                      />
                    )}
                  </span>
                  <span className={`mt-2 block transition-colors ${active === i ? "text-fg" : "group-hover:text-fg"}`}>
                    {String(i + 1).padStart(2, "0")} {c}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.a
          href="#belief"
          className="hero-scroll absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.7rem] tracking-[0.12em] text-fg/70 lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 1 }}
          aria-label="Scroll to the next section"
        >
          <span>SCROLL</span>
          <span className="relative block h-12 w-px overflow-hidden bg-fg/20">
            <motion.span
              className="absolute top-0 left-0 block h-1/2 w-full bg-fg"
              animate={reduce ? undefined : { y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
            />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
