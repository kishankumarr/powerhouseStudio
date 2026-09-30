import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ImageReveal, Reveal, RevealText } from "@/components/motion";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { media } from "@/content/media";
import { services } from "@/content/services";
import { audiences } from "@/content/site";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Studio rentals in Mangaluru for video shoots, photography, product shoots, interviews, podcasts and creator content at Powerhouse Studios.",
  alternates: { canonical: "/studio" },
};

const studio = services.find((s) => s.slug === "studio-rentals")!;
const creators = audiences.find((a) => a.title === "For creators")!;
const creatorSupport = [
  "Studio access",
  "Video production",
  "Podcast production",
  "Video editing",
  "Reels",
  "YouTube content",
  "Photography",
  "Creative assistance",
  "Content production",
];

export default function StudioPage() {
  return (
    <>
      <PageHero
        label="The studio"
        title={["A controlled space", "for professional", "content."]}
        intro={<p>{studio.intro[0]} {studio.intro[1]}</p>}
        image={media.studio}
      />

      <section className="py-20 md:py-32" aria-labelledby="uses-title">
        <div className="mx-auto grid max-w-[1680px] gap-12 px-4 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="meta mb-5" id="uses-title">
                What the studio supports
              </p>
            </Reveal>
            <RevealText as="h2" lines={["Shoots, podcasts,", "interviews and", "everything between."]} className="display t-lg" />
          </div>
          <ul className="grid self-end border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:col-span-6 lg:col-start-7">
            {studio.includes.map((u, i) => (
              <Reveal as="li" key={u} delay={i * 0.03} className="flex items-baseline gap-4 border-b border-line py-4 text-[1.05rem]">
                <span className="meta tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {u}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-20 md:pb-32" aria-label="Studio images">
        <div className="mx-auto grid max-w-[1680px] gap-6 px-4 sm:px-8 md:grid-cols-12 md:gap-8 lg:px-12">
          <ImageReveal className="relative aspect-[4/5] rounded-media md:col-span-4">
            <div className="relative h-full w-full">
              <Media asset={media.services.studio} sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
          </ImageReveal>
          <ImageReveal className="relative aspect-[4/5] rounded-media md:col-span-4 md:mt-24" delay={0.1}>
            <div className="relative h-full w-full">
              <Media asset={media.hero[2]} sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
          </ImageReveal>
          <ImageReveal className="relative aspect-[4/5] rounded-media md:col-span-4 md:mt-48" delay={0.2}>
            <div className="relative h-full w-full">
              <Media asset={media.services.photography} sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
          </ImageReveal>
        </div>
      </section>

      <section className="border-t border-line py-24 md:py-40" aria-labelledby="creators-title">
        <div className="mx-auto grid max-w-[1680px] gap-12 px-4 sm:px-8 md:grid-cols-12 lg:px-12">
          <div className="md:col-span-6">
            <Reveal>
              <p className="meta mb-5" id="creators-title">
                {creators.title}
              </p>
            </Reveal>
            <RevealText as="h2" lines={["Creators need more", "than a camera."]} className="display t-xl" />
            <Reveal className="lede mt-8 text-muted">
              <p>{creators.body}</p>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:self-end">
            <Reveal>
              <h3 className="meta mb-4">Powerhouse can support creators with</h3>
              <ul className="flex flex-wrap gap-2">
                {creatorSupport.map((c) => (
                  <li key={c} className="border border-line px-4 py-2 text-[0.95rem] rounded-ui">
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Button href="/contact?type=Studio%20Rentals">Enquire about the studio</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
