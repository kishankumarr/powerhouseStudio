import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Play } from "lucide-react";
import { ImageReveal, Parallax, Reveal, RevealText, Stagger } from "@/components/motion";
import { Media } from "@/components/ui/Media";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ProjectCard } from "@/components/sections/WorkGrid";
import { getProject, projects } from "@/content/work";
import { site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title}: ${p.format}`,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: `${p.title} | Powerhouse Studios`, description: p.summary, images: [{ url: new URL(p.images[0].src, site.url).href }] },
  };
}

function Slot({ value, label }: { value: string | null; label: string }) {
  return value ? <>{value}</> : <span className="slot">{label} to be added</span>;
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const [hero, a, b, wide] = project.images;

  return (
    <article>
      {/* Cinematic opener */}
      <header className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden text-[#f2eee6]">
        <Parallax className="absolute inset-0 -z-10" amount={10}>
          <div className="relative h-full w-full">
            <Media asset={hero} sizes="100vw" preload />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/85" />
          </div>
        </Parallax>
        <div className="mx-auto w-full max-w-[1680px] px-4 pt-40 pb-12 sm:px-8 md:pb-16 lg:px-12">
          {project.sample && (
            <Reveal>
              <p className="mb-8 inline-block border border-white/30 px-3 py-1.5 text-[0.75rem] text-white/80 rounded-ui">
                Sample case study. Structure ready for a real Powerhouse project.
              </p>
            </Reveal>
          )}
          <Reveal>
            <p className="mb-4 text-[0.9rem] text-white/75">
              {String(idx + 1).padStart(2, "0")} / {project.format}
            </p>
          </Reveal>
          <RevealText as="h1" lines={[project.title]} className="display t-hero" animate delay={0.2} />
        </div>
      </header>

      {/* Facts */}
      <section aria-label="Project details" className="border-b border-line">
        <dl className="mx-auto grid max-w-[1680px] grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 text-[0.95rem] sm:grid-cols-3 sm:px-8 lg:grid-cols-5 lg:px-12">
          {[
            ["Client", <Slot key="c" value={project.client} label="Client" />],
            ["Service", project.service],
            ["Industry", project.industry],
            ["Year", <Slot key="y" value={project.year} label="Year" />],
            ["Location", <Slot key="l" value={project.location} label="Location" />],
          ].map(([k, v]) => (
            <div key={k as string}>
              <dt className="meta mb-1.5">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Overview */}
      <section className="py-24 md:py-36" aria-labelledby="overview">
        <div className="mx-auto grid max-w-[1680px] gap-12 px-4 sm:px-8 md:grid-cols-12 lg:px-12">
          <div className="md:col-span-7">
            <Reveal>
              <h2 id="overview" className="meta mb-6">
                Overview
              </h2>
            </Reveal>
            <Reveal>
              <p className="display t-md normal-case leading-[1.25]">{project.summary}</p>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Reveal>
              <h2 className="meta mb-6">Highlights</h2>
            </Reveal>
            <Stagger as="ul" className="border-t border-line">
              {project.highlights.map((h) => (
                <p key={h} className="border-b border-line py-4">
                  {h}
                </p>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section aria-label="Gallery" className="pb-24 md:pb-36">
        <div className="mx-auto grid max-w-[1680px] gap-6 px-4 sm:px-8 md:grid-cols-12 md:gap-8 lg:px-12">
          <ImageReveal className="relative aspect-[3/4] rounded-media md:col-span-5">
            <div className="relative h-full w-full">
              <Media asset={a} sizes="(min-width: 768px) 40vw, 100vw" />
            </div>
          </ImageReveal>
          <ImageReveal className="relative aspect-[3/4] rounded-media md:col-span-5 md:col-start-8 md:mt-40" delay={0.1}>
            <div className="relative h-full w-full">
              <Media asset={b} sizes="(min-width: 768px) 40vw, 100vw" />
            </div>
          </ImageReveal>
        </div>
        <div className="mt-6 md:mt-10">
          <Parallax className="relative aspect-[4/3] md:aspect-[21/9]" amount={8}>
            <div className="relative h-full w-full">
              <Media asset={wide} sizes="100vw" />
            </div>
          </Parallax>
        </div>
      </section>

      {/* Film */}
      <section aria-labelledby="film" className="pb-24 md:pb-36">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-8 lg:px-12">
          <Reveal>
            <h2 id="film" className="meta mb-6">
              The film
            </h2>
          </Reveal>
          {project.video ? (
            <video
              className="aspect-video w-full bg-black object-cover rounded-media"
              src={project.video.src}
              poster={project.video.poster}
              controls
              playsInline
              preload="none"
            />
          ) : (
            <div className="relative grid aspect-video place-items-center overflow-hidden bg-black text-white rounded-media">
              <Media asset={hero} sizes="100vw" className="opacity-40" />
              <div className="relative flex flex-col items-center gap-4 text-center">
                <span className="grid size-20 place-items-center rounded-full border border-white/50">
                  <Play className="size-6 translate-x-0.5" strokeWidth={1.5} aria-hidden />
                </span>
                <p className="text-[0.9rem] text-white/80">Project film to be added</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Approach */}
      <section aria-label="Approach" className="border-t border-line py-24 md:py-36">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-8 lg:px-12">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="meta mb-5">Creative direction</p>
              </Reveal>
              <RevealText as="h2" lines={["How it", "comes together."]} className="display t-lg" />
            </div>
            <ol className="border-t border-line md:col-span-7 md:col-start-6">
              {project.approach.map((s, i) => (
                <Reveal as="li" key={s.stage} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-7 md:grid-cols-[4rem_12rem_1fr]">
                  <span className="meta pt-1 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display t-sm">{s.stage}</h3>
                  <p className="col-start-2 text-muted md:col-start-auto md:pt-1">{s.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <h2 className="meta">Production details</h2>
            </Reveal>
            <Stagger as="ul" className="flex flex-wrap gap-2 md:col-span-7 md:col-start-6" gap={0.04}>
              {project.deliverables.map((d) => (
                <span key={d} className="inline-block border border-line px-4 py-2 text-[0.9rem] rounded-ui">
                  {d}
                </span>
              ))}
            </Stagger>
          </div>

          {project.testimonial && (
            <figure className="mt-24 border-t border-line pt-12">
              <blockquote className="display t-lg max-w-5xl">&ldquo;{project.testimonial.quote}&rdquo;</blockquote>
              <figcaption className="mt-8 text-muted">
                {project.testimonial.name}
                {project.testimonial.role ? `, ${project.testimonial.role}` : ""}
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      {/* Next */}
      <section aria-label="Next project" className="border-t border-line py-24 md:py-32">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-8 lg:px-12">
          <div className="mb-10 flex items-baseline justify-between">
            <p className="meta">Next project</p>
            <Link href="/work" className="text-[0.9rem] underline-offset-4 hover:underline">
              All work
            </Link>
          </div>
          <div className="md:w-2/3">
            <ProjectCard project={next} index={(idx + 1) % projects.length} aspect="aspect-[16/9]" sizes="(min-width: 768px) 66vw, 100vw" />
          </div>
        </div>
      </section>

      <FinalCTA />
    </article>
  );
}
