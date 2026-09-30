"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/content/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="border-t border-line">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={`faq-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="display t-sm normal-case leading-[1.1]">{f.q}</span>
                <Plus
                  aria-hidden
                  strokeWidth={1.5}
                  className={`size-6 shrink-0 transition-transform duration-500 ease-cine ${isOpen ? "rotate-45" : ""}`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 text-muted">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
