import { ImageReveal, Reveal, RevealText } from "@/components/motion";
import { Media } from "@/components/ui/Media";
import type { MediaAsset } from "@/content/media";

/** Opening block for inner pages: label, oversized title, intro and an optional wide image. */
export function PageHero({
  label,
  title,
  intro,
  image,
  children,
}: {
  label: string;
  title: string[];
  intro?: React.ReactNode;
  image?: MediaAsset;
  children?: React.ReactNode;
}) {
  return (
    <header className="pt-36 pb-16 md:pt-48 md:pb-24">
      <div className="mx-auto max-w-[1680px] px-4 sm:px-8 lg:px-12">
        <Reveal>
          <p className="meta mb-6">{label}</p>
        </Reveal>
        <RevealText as="h1" lines={title} className="display t-xxl" animate delay={0.15} />
        {(intro || children) && (
          <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12">
            {intro && (
              <Reveal delay={0.4} className="lede md:col-span-6 md:col-start-7">
                {intro}
              </Reveal>
            )}
            {children}
          </div>
        )}
      </div>
      {image && (
        <div className="mx-auto mt-16 max-w-[1680px] px-4 sm:px-8 md:mt-24 lg:px-12">
          <ImageReveal className="relative aspect-[4/5] rounded-media sm:aspect-[21/9]" delay={0.3}>
            <div className="relative h-full w-full">
              <Media asset={image} sizes="100vw" preload />
            </div>
          </ImageReveal>
        </div>
      )}
    </header>
  );
}
