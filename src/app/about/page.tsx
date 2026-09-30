import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Parallax, Reveal, RevealText, Stagger } from "@/components/motion";
import { Media } from "@/components/ui/Media";
import { Belief } from "@/components/sections/Belief";
import { Founders } from "@/components/sections/Founders";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { media } from "@/content/media";
import { mission, reasons, site, vision } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Powerhouse Studios is a growing creative studio in Mangaluru, founded by Sharan Chilimbi and Shravan Rajani, bringing creative strategy, content, production and events under one roof.",
  alternates: { canonical: "/about" },
};

const disciplines = [
  "Creative strategy",
  "Content creation",
  "Social media",
  "Video production",
  "Video editing",
  "Photography",
  "Event management",
  "Event production",
  "Event coverage",
  "Studio production",
  "Digital campaigns",
  "Brand communication",
];

const purposes = [
  "Introduce a brand",
  "Explain a product",
  "Educate an audience",
  "Build credibility",
  "Create awareness",
  "Generate conversations",
  "Showcase an experience",
  "Strengthen a brand's identity",
  "Document an important moment",
  "Entertain an audience",
  "Support a campaign",
  "Create long-term brand value",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Powerhouse"
        title={["Every brand has", "something worth", "saying."]}
        intro={
          <p>
            Sometimes it is a story. Sometimes it is a product, a person or an experience. Our job is to find that story,
            shape it and bring it to life.
          </p>
        }
        image={media.about}
      />

      {/* Who we are */}
      <section className="py-20 md:py-32" aria-labelledby="who-title">
        <div className="mx-auto grid max-w-[1680px] gap-12 px-4 sm:px-8 md:grid-cols-12 lg:px-12">
          <div className="md:col-span-5">
            <Reveal>
              <h2 id="who-title" className="meta mb-6">
                Who we are
              </h2>
              <p className="lede">
                Powerhouse Studios is a growing creative studio based in {site.location.city}, {site.location.region},
                working with brands and businesses across different industries.
              </p>
              <p className="mt-5 text-muted">
                A client may come to us looking for social media management and eventually need a campaign, video
                production, event coverage or a complete content strategy. Our role is to understand the bigger picture and
                build the right creative solution around it.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="meta mb-6">Disciplines under one roof</p>
            </Reveal>
            <Stagger as="ul" className="display t-md flex flex-wrap gap-x-[0.4em] gap-y-1 leading-[1.25]" gap={0.04}>
              {disciplines.map((d, i) => (
                <span key={d} className={i % 3 === 1 ? "text-muted" : undefined}>
                  {d}
                  {i < disciplines.length - 1 ? <span className="ml-[0.3em] text-accent-text">/</span> : null}
                </span>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <Belief />

      {/* Philosophy */}
      <section className="border-t border-line py-24 md:py-36" aria-labelledby="philosophy-title">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-8 lg:px-12">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <Reveal>
                <p className="meta mb-5" id="philosophy-title">
                  Our philosophy
                </p>
              </Reveal>
              <RevealText as="h2" lines={["Every piece of", "communication", "should have a reason."]} className="display t-xl" />
            </div>
            <Reveal className="lede text-muted md:col-span-4 md:self-end">
              <p>
                We don&apos;t believe in creating content just for the sake of creating content. We combine creativity with
                purpose to make content that works for the brand.
              </p>
            </Reveal>
          </div>
          <Stagger as="ul" className="mt-16 grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4" gap={0.03}>
            {purposes.map((p) => (
              <p key={p} className="border-b border-line py-5 pr-6 text-[1.05rem]">
                {p}
              </p>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why Powerhouse */}
      <section className="py-24 md:py-36" aria-labelledby="why-title">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-8 lg:px-12">
          <Reveal>
            <p className="meta mb-5" id="why-title">
              Why Powerhouse Studios
            </p>
          </Reveal>
          <RevealText as="h2" lines={["Creative thinking,", "production, execution."]} className="display t-xl" />
          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={(i % 3) * 0.06} className="border-t border-line pt-6">
                <h3 className="display t-sm">{r.title}</h3>
                <p className="mt-3 text-muted">{r.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Founders full />

      {/* Vision and mission, set over the coast */}
      <section className="relative isolate overflow-hidden text-[#f2eee6]" aria-label="Vision and mission">
        <Parallax className="absolute inset-0 -z-10" amount={10}>
          <div className="relative h-full w-full">
            <Media asset={media.mangaluru} sizes="100vw" />
            <div aria-hidden className="absolute inset-0 bg-black/60" />
          </div>
        </Parallax>
        <div className="mx-auto grid min-h-[90svh] max-w-[1680px] content-end gap-12 px-4 py-24 sm:px-8 md:grid-cols-2 md:gap-16 lg:px-12">
          <Reveal>
            <h2 className="mb-5 text-[0.85rem] text-white/70">Our vision</h2>
            <p className="display t-md normal-case leading-[1.25]">{vision}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mb-5 text-[0.85rem] text-white/70">Our mission</h2>
            <p className="display t-md normal-case leading-[1.25]">{mission}</p>
            <p className="mt-6 text-white/75">Strategy + Creativity + Production + Execution</p>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
