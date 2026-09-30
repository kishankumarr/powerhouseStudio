"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";
import { Children, useRef, type ElementType, type ReactNode } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";

const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Fades content up into place once it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "p" | "span" | "article" | "header" | "figure";
}) {
  const reduce = useReducedMotionSafe();
  const { motion: m } = useTheme();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: m.duration, ease: m.ease, delay }}
    >
      {children}
    </Comp>
  );
}

/** Staggers direct children in. */
export function Stagger({
  children,
  className,
  gap = 0.08,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  as?: "div" | "ul" | "ol";
}) {
  const reduce = useReducedMotionSafe();
  const { motion: m } = useTheme();
  const Comp = motion[as] as typeof motion.div;
  const ChildComp = as === "div" ? motion.div : (motion.li as unknown as typeof motion.div);
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ staggerChildren: gap }}
    >
      {Children.map(children, (child) => (
        <ChildComp
          variants={{
            hidden: { opacity: 0, y: reduce ? 0 : 22 },
            show: { opacity: 1, y: 0, transition: { duration: m.duration * 0.8, ease: m.ease } },
          }}
        >
          {child}
        </ChildComp>
      ))}
    </Comp>
  );
}

/**
 * Masked line-by-line text reveal. Each line slides up from behind its own mask.
 * Pass `animate` to play immediately (hero) instead of on scroll.
 */
export function RevealText({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  animate = false,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  animate?: boolean;
}) {
  const reduce = useReducedMotionSafe();
  const { motion: m } = useTheme();
  const Tag = as;
  const trigger = animate ? { animate: "show" } : { whileInView: "show", viewport: VIEWPORT };
  return (
    <Tag className={className}>
      <motion.span className="block" initial="hidden" {...trigger} transition={{ staggerChildren: stagger, delayChildren: delay }}>
        {lines.map((line, i) => (
          <span key={i} className={`-mx-[0.1em] -mb-[0.08em] block overflow-hidden px-[0.1em] pb-[0.08em] ${lineClassName ?? ""}`}>
            <motion.span
              className="block will-change-transform"
              variants={{
                hidden: reduce ? { opacity: 0 } : { y: "110%", rotate: 2 },
                show: reduce ? { opacity: 1 } : { y: "0%", rotate: 0 },
              }}
              transition={{ duration: m.duration * 1.1, ease: m.ease }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Image container that wipes open with a clip-path and settles from a slight zoom. */
export function ImageReveal({
  children,
  className,
  delay = 0,
  from = "bottom",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right";
}) {
  const reduce = useReducedMotionSafe();
  const { motion: m } = useTheme();
  const hidden = { bottom: "inset(100% 0% 0% 0%)", left: "inset(0% 100% 0% 0%)", right: "inset(0% 0% 0% 100%)" }[from];
  return (
    <motion.div
      className={`overflow-hidden ${className ?? ""}`}
      initial={reduce ? { opacity: 0 } : { clipPath: hidden }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={VIEWPORT}
      transition={{ duration: m.duration * 1.25, ease: m.ease, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: m.duration * 1.8, ease: m.ease, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Moves its content against the scroll direction for depth. */
export function Parallax({
  children,
  className,
  amount = 12,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div className="h-full w-full will-change-transform" style={{ y: reduce ? 0 : y, scale: reduce ? 1 : 1 + amount / 50 }}>
        {children}
      </motion.div>
    </div>
  );
}

/** Pulls its child toward the pointer while hovered (pointer devices only). */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={`inline-block shrink-0 ${className ?? ""}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Simple wrapper for elements that need motion props but no behaviour of their own. */
export function MotionDiv(props: HTMLMotionProps<"div">) {
  return <motion.div {...props} />;
}
