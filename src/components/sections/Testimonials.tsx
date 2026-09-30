"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { testimonials } from "@/content/site";

/**
 * Large-quote testimonials. Renders nothing until real quotes are added to
 * `testimonials` in content/site.ts; quotes are never invented.
 */
export function Testimonials() {
  const [i, setI] = useState(0);
  if (testimonials.length === 0) return null;
  const t = testimonials[i];

  return (
    <section className="py-24 md:py-40" aria-label="What clients say">
      <div className="mx-auto max-w-[1680px] px-4 sm:px-8 lg:px-12">
        <p className="meta mb-10">What clients say</p>
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            <blockquote className="display t-lg max-w-6xl">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-10 text-[0.95rem]">
              <span className="block">{t.name}</span>
              <span className="text-muted">{[t.company, t.project].filter(Boolean).join(", ")}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
        {testimonials.length > 1 && (
          <div className="mt-12 flex gap-3">
            {testimonials.map((q, n) => (
              <button
                key={q.name + n}
                type="button"
                aria-label={`Show quote from ${q.name}`}
                aria-pressed={n === i}
                onClick={() => setI(n)}
                className={`h-px w-12 transition-colors ${n === i ? "bg-fg" : "bg-line hover:bg-fg/50"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
