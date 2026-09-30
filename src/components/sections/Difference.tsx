"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import { useEffect, useRef, useState } from "react";
import { difference } from "@/content/site";
import { Reveal } from "@/components/motion";

/** "Sometimes that means…" with the ending rotating through what Powerhouse takes on. */
export function Difference() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduce = useReducedMotionSafe();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % difference.sometimes.length), 2600);
    return () => window.clearInterval(id);
  }, [inView]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-44" aria-labelledby="difference-title">
      <div className="mx-auto max-w-[1680px] px-4 sm:px-8 lg:px-12">
        <Reveal>
          <p id="difference-title" className="text-[1.05rem]">
            {difference.lead}
          </p>
        </Reveal>

        <div className="display t-xl mt-10 md:mt-14" aria-live="off">
          <span className="block text-muted">Sometimes that means</span>
          <span className="relative block min-h-[3.6em] overflow-hidden md:min-h-[1.9em]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={i}
                className="display-accent block"
                initial={reduce ? { opacity: 0 } : { y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
              >
                {difference.sometimes[i]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="sr-only">Sometimes that means {difference.sometimes.join(" Or ")}</span>
        </div>

        <Reveal className="mt-14 grid gap-6 border-t border-line pt-8 md:mt-20 md:grid-cols-12">
          <p className="text-[1.05rem] md:col-span-5">{difference.close}</p>
        </Reveal>
      </div>
    </section>
  );
}
