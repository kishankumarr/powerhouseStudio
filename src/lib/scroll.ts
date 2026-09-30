"use client";

import { useTransform, type MotionValue } from "motion/react";

/**
 * Scroll-linked mapping computed in JS (function form), which keeps the end value
 * held after the range instead of relying on native scroll-timeline fill behaviour.
 */
export function useRange<T extends number | string>(
  progress: MotionValue<number>,
  [a, b]: [number, number],
  [from, to]: [T, T],
): MotionValue<T> {
  return useTransform(progress, (v) => {
    const t = Math.min(1, Math.max(0, (v - a) / (b - a || 1)));
    if (typeof from === "number" && typeof to === "number") return (from + (to - from) * t) as T;
    const unit = String(from).replace(/[-\d.]/g, "");
    const f = parseFloat(String(from));
    const e = parseFloat(String(to));
    return `${f + (e - f) * t}${unit}` as T;
  });
}
