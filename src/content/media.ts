import demo from "./demo-media.json";
import { asset } from "@/lib/paths";

export type MediaAsset = {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
  alt: string;
  /** True for stand-in stock imagery that must be replaced with Powerhouse's own work. */
  demo?: boolean;
  credit?: { name: string; url: string; photo: string };
};

type DemoKey = keyof typeof demo;

/**
 * Demo imagery (free Unsplash licence) used until Powerhouse supplies its own work.
 * To replace one: drop a file in /public/media and swap the entry below for
 * { src: "/media/your-file.jpg", width, height, alt }.
 */
const ALT: Partial<Record<DemoKey, string>> = {
  "hero-a": "Camera operator filming in red light",
  "hero-b": "Crowd facing a stage in amber light",
  "hero-c": "Empty studio set with a chair under a softbox",
  "svc-social": "Creator filming herself on a phone",
  "svc-video": "Close-up of a cinema camera lens",
  "svc-editing": "Editing desk with a timeline on screen",
  "svc-photo": "Product photography set with lights",
  "svc-events": "Stage lighting rig in haze",
  "svc-coverage": "Camera monitor during an event shoot",
  "svc-studio": "Bright studio with softbox and director's chair",
  "svc-campaigns": "Fashion portrait with bold colour",
  experience: "Audience with raised hands under stage lights",
  cta: "A single figure under a spotlight",
  studio: "Podcast set with coloured light panels",
  mangaluru: "Aerial view of a coastal beach",
  about: "Film crew working on a warehouse set",
};

function fromDemo(key: DemoKey, alt?: string): MediaAsset {
  const d = demo[key];
  return {
    src: asset(d.src),
    width: d.width,
    height: d.height,
    blurDataURL: d.blurDataURL,
    alt: alt ?? ALT[key] ?? d.alt,
    demo: true,
    credit: d.credit,
  };
}

export const media = {
  hero: [fromDemo("hero-a"), fromDemo("hero-b"), fromDemo("hero-c")],
  services: {
    social: fromDemo("svc-social"),
    video: fromDemo("svc-video"),
    editing: fromDemo("svc-editing"),
    photography: fromDemo("svc-photo"),
    events: fromDemo("svc-events"),
    coverage: fromDemo("svc-coverage"),
    studio: fromDemo("svc-studio"),
    campaigns: fromDemo("svc-campaigns"),
  },
  experience: fromDemo("experience"),
  cta: fromDemo("cta"),
  studio: fromDemo("studio"),
  mangaluru: fromDemo("mangaluru"),
  about: fromDemo("about"),
  project: (prefix: "p1" | "p2" | "p3" | "p4" | "p5" | "p6") =>
    (["a", "b", "c", "d"] as const).map((s) => fromDemo(`${prefix}-${s}` as DemoKey)),
};

export const allDemoCredits = Object.values(demo).map((d) => d.credit);
