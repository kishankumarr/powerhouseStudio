"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Media } from "@/components/ui/Media";
import type { Service } from "@/content/services";

/**
 * Index of services. On pointer devices the matching image floats beside the cursor;
 * on touch each row shows a small inline thumbnail instead.
 */
export function ServicesList({ services }: { services: Service[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotionSafe();
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 140, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 140, damping: 20, mass: 0.6 });

  return (
    <div className="relative">
      <ul
        ref={listRef}
        className="border-b border-line"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || !listRef.current) return;
          const r = listRef.current.getBoundingClientRect();
          x.set(e.clientX - r.left);
          y.set(e.clientY - r.top);
        }}
        onPointerLeave={() => setHovered(null)}
      >
        {services.map((s, i) => (
          <li key={s.slug} className="border-t border-line" onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}>
            <Link
              href={`/services#${s.slug}`}
              className="group grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 py-5 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-6 md:py-7"
              data-cursor="View"
            >
              <span className="meta self-start pt-2 tabular-nums md:pt-3">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span
                  className={`display t-lg block transition-[transform,opacity] duration-700 ease-cine md:group-hover:translate-x-4 ${
                    hovered !== null && hovered !== i ? "md:opacity-30" : ""
                  }`}
                >
                  {s.title}
                </span>
                <span className="mt-2 block max-w-lg text-[0.95rem] text-muted">{s.short}</span>
              </span>
              <span className="flex items-center gap-4">
                <span className="relative block size-16 overflow-hidden rounded-media sm:size-20 md:hidden">
                  <Media asset={s.image} sizes="80px" />
                </span>
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="hidden size-8 transition-transform duration-700 ease-cine group-hover:rotate-45 md:block"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Floating preview, desktop only. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-10 hidden md:block"
        style={{ x: reduce ? x : sx, y: reduce ? y : sy }}
      >
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              key="preview"
              className="relative -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-media"
              style={{ width: "clamp(15rem, 22vw, 24rem)", aspectRatio: "3 / 4", rotate: -3 }}
              initial={{ opacity: 0, scale: 0.85, clipPath: "inset(50% 50% 50% 50%)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ opacity: 0, scale: 0.9, clipPath: "inset(50% 50% 50% 50%)" }}
              transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
            >
              {services.map((s, i) => (
                <motion.div
                  key={s.slug}
                  className="absolute inset-0"
                  animate={{ opacity: hovered === i ? 1 : 0, scale: hovered === i ? 1 : 1.12 }}
                  transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                >
                  <Media asset={s.image} sizes="24rem" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
