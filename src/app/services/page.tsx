import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ImageReveal, Reveal, RevealText } from "@/components/motion";
import { Media } from "@/components/ui/Media";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Process } from "@/components/sections/Process";
import { Button } from "@/components/ui/Button";
import { services } from "@/content/services";
import { engagements } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Social media management, video production, editing, photography, event management, event coverage, studio rentals and brand campaigns from Powerhouse Studios, Mangaluru.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title={["Eight disciplines.", "One creative partner."]}
        intro={
          <p>
            Instead of treating these as separate services, we bring them together to create a more connected brand
            experience. From an idea on paper to the final piece of content, from a social campaign to a large-scale
            event.
          </p>
        }
      />

      <nav aria-label="Service index" className="border-y border-line" data-audit-skip>
        <ul className="mx-auto flex max-w-[1680px] gap-x-8 gap-y-2 overflow-x-auto px-4 py-5 text-[0.9rem] whitespace-nowrap sm:px-8 lg:flex-wrap lg:px-12">
          {services.map((s, i) => (
            <li key={s.slug}>
              <a href={`#${s.slug}`} className="text-muted transition-colors hover:text-fg">
                <span className="mr-2 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {services.map((s, i) => (
        <section key={s.slug} id={s.slug} className="scroll-mt-20 border-b border-line py-20 md:py-32" aria-labelledby={`${s.slug}-title`}>
          <div className="mx-auto grid max-w-[1680px] gap-10 px-4 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
            <div className="lg:col-span-5">
              <div className="grid gap-8 sm:grid-cols-2 sm:items-end lg:sticky lg:top-28 lg:block">
                <Reveal>
                  <p className="meta mb-4 tabular-nums">{String(i + 1).padStart(2, "0")} / 08</p>
                  <h2 id={`${s.slug}-title`} className="display t-lg">
                    {s.title}
                  </h2>
                </Reveal>
                <ImageReveal className="relative aspect-[4/3] rounded-media sm:order-first lg:mt-10 lg:aspect-[4/5] lg:max-w-md">
                  <div className="relative h-full w-full">
                    <Media asset={s.image} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
                  </div>
                </ImageReveal>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
              <Reveal className="space-y-5">
                {s.intro.map((p, n) => (
                  <p key={p} className={n === 0 ? "display t-sm normal-case leading-[1.3]" : "lede text-muted"}>
                    {p}
                  </p>
                ))}
              </Reveal>
              <Reveal className="mt-12">
                <h3 className="meta mb-4">What this can include</h3>
                <ul className="grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
                  {s.includes.map((item) => (
                    <li key={item} className="border-b border-line py-3 text-[0.98rem]">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="display-accent display t-sm max-w-md normal-case">{s.closing}</p>
                <Button href={`/contact?type=${encodeURIComponent(s.title)}`} variant="outline" magnetic={false}>
                  Enquire
                </Button>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="py-24 md:py-40" aria-labelledby="engage-title">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-8 lg:px-12">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <Reveal>
                <p className="meta mb-5" id="engage-title">
                  Working with Powerhouse
                </p>
              </Reveal>
              <RevealText as="h2" lines={["A brief, or", "only an idea."]} className="display t-xl" />
            </div>
            <Reveal className="lede text-muted md:col-span-5 md:col-start-8 md:self-end">
              <p>Whether you already have a detailed brief or only have an idea, you can start a conversation with us. We adapt our involvement to what your brand needs.</p>
            </Reveal>
          </div>
          <ul className="mt-16 border-t border-line md:mt-24">
            {engagements.map((e) => (
              <Reveal as="li" key={e.title} className="grid gap-2 border-b border-line py-7 md:grid-cols-12 md:items-baseline md:gap-8">
                <h3 className="display t-md md:col-span-6">{e.title}</h3>
                <p className="text-muted md:col-span-5 md:col-start-8">{e.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Process />
      <FinalCTA />
    </>
  );
}
