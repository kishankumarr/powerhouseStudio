"use client";

import { motion, useScroll, type MotionValue } from "motion/react";
import { useRange } from "@/lib/scroll";
import { useRef } from "react";
import { beliefs } from "@/content/site";
import { useMediaQuery, useReducedMotionSafe } from "@/lib/useMediaQuery";

function Row({
  i,
  progress,
  reduce,
}: {
  i: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const b = beliefs[i];
  const start = 0.08 + i * 0.26;
  const opacity = useRange(progress, [start - 0.08, start + 0.08], [0.14, 1]);
  // Words travel in from the right only, so nothing is ever pushed past the left edge.
  const x = useRange(progress, [start - 0.12, start + 0.12], [`${4 + i * 2}vw`, "0vw"]);
  const bodyOpacity = useRange(progress, [start, start + 0.12], [0, 1]);
  const bodyY = useRange(progress, [start, start + 0.12], [24, 0]);
  const arrowScale = useRange(progress, [start - 0.06, start + 0.06], [0, 1]);

  return (
    <div className="grid items-end gap-4 border-t border-line py-6 md:grid-cols-12 md:gap-8 md:py-8">
      <motion.div
        className="display t-xxl flex items-baseline gap-[0.25em] md:col-span-8"
        style={reduce ? { opacity: 1, x: 0 } : { opacity, x }}
        data-indent={i}
      >
        {i > 0 && (
          <motion.span
            aria-hidden
            className="inline-block origin-left text-accent-text"
            style={reduce ? { scaleX: 1 } : { scaleX: arrowScale }}
          >
            →
          </motion.span>
        )}
        <span>{b.word}</span>
      </motion.div>
      <motion.div className="md:col-span-4 md:pb-3" style={reduce ? { opacity: 1, y: 0 } : { opacity: bodyOpacity, y: bodyY }}>
        <h3 className="text-[1.05rem] font-medium">{b.title}</h3>
        <p className="mt-2 max-w-sm text-[0.95rem] leading-relaxed text-muted">{b.body}</p>
      </motion.div>
    </div>
  );
}

export function Belief() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = !!useReducedMotionSafe();
  const desktop = useMediaQuery("(min-width: 768px)", true);
  // Scroll-linked choreography only runs where the section is pinned (tablet and up).
  const reduce = reducedMotion || !desktop;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="belief" ref={ref} className="relative md:h-[280vh]" aria-labelledby="belief-title">
      <div className="md:sticky md:top-0 md:flex md:h-[100svh] md:flex-col md:justify-center">
        <div className="mx-auto w-full max-w-[1680px] px-4 py-24 sm:px-8 md:py-0 lg:px-12">
          <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
            <h2 id="belief-title" className="max-w-md text-[1.05rem] leading-snug">
              A good business can exist without being visible. It becomes much harder to grow when people don&apos;t
              know it exists.
            </h2>
            <p className="meta max-w-xs md:text-right">That is the thinking behind Powerhouse.</p>
          </div>
          {beliefs.map((_, i) => (
            <Row key={i} i={i} progress={scrollYProgress} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}
