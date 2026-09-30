"use client";

import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { ImageReveal } from "@/components/motion";
import type { Project } from "@/content/work";

/**
 * Editorial grid: each slot has its own span, aspect ratio and vertical offset,
 * so the page reads like a layout rather than a card grid.
 */
const SLOTS = [
  { col: "lg:col-span-7", aspect: "aspect-[4/3]", offset: "lg:mt-0", cover: 0 },
  { col: "lg:col-span-4 lg:col-start-9", aspect: "aspect-[4/3] lg:aspect-[3/4]", offset: "lg:mt-48", cover: 1 },
  { col: "lg:col-span-4 lg:col-start-2", aspect: "aspect-[4/3] lg:aspect-[3/4]", offset: "lg:-mt-24", cover: 1 },
  { col: "lg:col-span-6 lg:col-start-7", aspect: "aspect-[4/3] lg:aspect-[16/10]", offset: "lg:mt-24", cover: 0 },
  { col: "lg:col-span-5", aspect: "aspect-[4/3] lg:aspect-[4/5]", offset: "lg:mt-8", cover: 1 },
  { col: "lg:col-span-6 lg:col-start-7", aspect: "aspect-[4/3] lg:aspect-[3/2]", offset: "lg:mt-56", cover: 0 },
];

export function ProjectCard({
  project,
  index,
  aspect,
  cover = 0,
  sizes = "(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw",
}: {
  project: Project;
  index: number;
  aspect: string;
  cover?: number;
  sizes?: string;
}) {
  const second = project.images[cover === 0 ? 2 : 3];
  return (
    <Link href={`/work/${project.slug}`} className="group block" data-cursor="Explore">
      <div className={`relative ${aspect} overflow-hidden rounded-media bg-surface`}>
        <ImageReveal className="absolute inset-0">
          <div className="relative h-full w-full transition-transform duration-[1.4s] ease-cine group-hover:scale-[1.06]">
            <Media asset={project.images[cover]} sizes={sizes} />
          </div>
        </ImageReveal>
        {/* Secondary frame slides in on hover (desktop). */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-4 bottom-4 hidden aspect-[3/4] w-[28%] translate-y-6 overflow-hidden opacity-0 transition-all duration-700 ease-cine group-hover:translate-y-0 group-hover:opacity-100 rounded-media md:block"
        >
          <Media asset={second} sizes="15vw" />
        </div>
        <span className="absolute top-4 left-4 bg-bg/80 px-2.5 py-1 text-[0.7rem] text-fg backdrop-blur-md rounded-ui">
          {project.format}
        </span>
      </div>
      <div className="mt-5">
        <div className="flex items-baseline gap-4">
          <span className="meta tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="display t-md transition-transform duration-700 ease-cine group-hover:translate-x-2">{project.title}</h3>
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-line pt-3 text-[0.8rem] leading-snug">
          <div>
            <dt className="text-muted">Service</dt>
            <dd className="mt-0.5">{project.service}</dd>
          </div>
          <div>
            <dt className="text-muted">Industry</dt>
            <dd className="mt-0.5">{project.industry}</dd>
          </div>
          <div>
            <dt className="text-muted">Year</dt>
            <dd className="mt-0.5">{project.year ?? <span className="slot">To be added</span>}</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 md:gap-y-20 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-28">
      {projects.map((p, i) => {
        const slot = SLOTS[i % SLOTS.length];
        return (
          <div key={p.slug} className={`${slot.col} ${i % 2 ? "md:mt-24" : ""} ${slot.offset}`}>
            <ProjectCard project={p} index={i} aspect={slot.aspect} cover={slot.cover} />
          </div>
        );
      })}
    </div>
  );
}
