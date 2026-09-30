"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRange } from "@/lib/scroll";
import { useLayoutEffect, useRef, useState } from "react";
import { processSteps, processQuestions } from "@/content/site";
import { useMediaQuery, useReducedMotionSafe } from "@/lib/useMediaQuery";
import { Reveal } from "@/components/motion";

function Stage({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const s = processSteps[i];
  const at = (i + 1) / (processSteps.length + 1);
  const fill = useRange(progress, [at - 0.2, at], ["0%", "100%"]);
  const numOpacity = useRange(progress, [at - 0.22, at - 0.05], [0.18, 1]);
  return (
    <article className="flex h-full w-[78vw] shrink-0 flex-col justify-between border-l border-line px-8 py-10 lg:w-[34vw] xl:w-[30vw]">
      <motion.span className="display t-xxl tabular-nums text-accent-text" style={{ opacity: numOpacity }}>
        {String(i + 1).padStart(2, "0")}
      </motion.span>
      <div>
        <span className="relative mb-6 block h-px w-full bg-line">
          <motion.span className="absolute inset-y-0 left-0 block bg-fg" style={{ width: fill }} />
        </span>
        <h3 className="display t-lg">{s.title}</h3>
        <p className="mt-4 max-w-sm text-[1rem] leading-relaxed text-muted">{s.body}</p>
      </div>
    </article>
  );
}

function Intro() {
  return (
    <div className="flex w-[86vw] shrink-0 flex-col justify-between pr-10 lg:w-[40vw]">
      <div>
        <p className="meta mb-5">How we work</p>
        <h2 id="process-title" className="display t-xl">
          Every project begins with understanding.
        </h2>
      </div>
      <ul className="mt-10 space-y-2 text-[1rem]">
        {processQuestions.map((q) => (
          <li key={q} className="text-muted">
            {q}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Pinned horizontal progression on large screens; a simple vertical list elsewhere. */
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const desktop = useMediaQuery("(min-width: 1024px)", true);
  const reduce = useReducedMotionSafe();
  const pinned = desktop && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useLayoutEffect(() => {
    if (!pinned) return;
    const measure = () => {
      if (trackRef.current) setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned]);

  if (!pinned) {
    return (
      <section ref={ref} className="py-24" aria-labelledby="process-title">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-8">
          <Intro />
          <ol className="mt-14 border-t border-line">
            {processSteps.map((s, i) => (
              <Reveal as="li" key={s.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-line py-8">
                <span className="display t-md tabular-nums text-accent-text">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="display t-md">{s.title}</h3>
                  <p className="mt-3 text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative" style={{ height: `calc(100svh + ${distance}px)` }} aria-labelledby="process-title">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex h-[72svh] pl-12 will-change-transform">
          <Intro />
          {processSteps.map((s, i) => (
            <Stage key={s.title} i={i} progress={scrollYProgress} />
          ))}
          <div className="w-[12vw] shrink-0" aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}
