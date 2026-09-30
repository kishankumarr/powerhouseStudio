import { Parallax, Reveal, RevealText } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { media } from "@/content/media";
import { services } from "@/content/services";

const studio = services.find((s) => s.slug === "studio-rentals")!;

export function StudioFeature() {
  return (
    <section className="relative py-24 md:py-40" aria-label="Studio rentals">
      <div className="mx-auto grid max-w-[1680px] gap-12 px-4 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <div className="lg:col-span-7">
          <Parallax className="relative aspect-[4/5] rounded-media sm:aspect-[16/11]" amount={8}>
            <div className="relative h-full w-full">
              <Media asset={media.studio} sizes="(min-width: 1024px) 58vw, 100vw" />
            </div>
          </Parallax>
        </div>
        <div className="flex flex-col justify-between gap-10 lg:col-span-5 lg:pl-6">
          <div>
            <Reveal>
              <p className="meta mb-5">Studio rentals</p>
            </Reveal>
            <RevealText as="h2" lines={["A room built", "for content."]} className="display t-xl" />
            <Reveal className="lede mt-8 text-muted">
              <p>{studio.intro[1]}</p>
            </Reveal>
          </div>
          <Reveal>
            <ul className="grid grid-cols-2 border-t border-line text-[0.95rem]">
              {studio.includes.map((u) => (
                <li key={u} className="border-b border-line py-3 pr-4">
                  {u}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/studio">Explore the studio</Button>
              <Button href="/contact?type=Studio%20Rentals" variant="outline" magnetic={false}>
                Enquire about a booking
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
