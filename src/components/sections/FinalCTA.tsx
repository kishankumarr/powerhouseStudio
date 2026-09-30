import { Parallax, RevealText, Reveal } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { media } from "@/content/media";
import { site } from "@/content/site";

export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden" aria-label="Start a project">
      <Parallax className="absolute inset-0 -z-10" amount={10}>
        <div className="relative h-full w-full">
          <Media asset={media.cta} sizes="100vw" />
          <div aria-hidden className="absolute inset-0 bg-black/45" />
        </div>
      </Parallax>
      <div className="mx-auto flex min-h-[92svh] max-w-[1680px] flex-col justify-end px-4 pt-40 pb-14 text-[#f2eee6] sm:px-8 md:pb-20 lg:px-12">
        <Reveal>
          <p className="mb-6 text-[1rem] text-white/75">Have a project in mind?</p>
        </Reveal>
        <RevealText
          as="h2"
          lines={["Let's create", "something powerful."]}
          className="display t-xxl"
        />
        <Reveal className="mt-12 flex flex-col gap-8 border-t border-white/20 pt-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-white/75">
            Whether you already have a detailed brief or only have an idea, you can start a conversation with us.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Button href="/contact" cursor="Let's talk">
              Start a project
            </Button>
            <a href={`mailto:${site.contact.email}`} className="text-[0.95rem] text-white/85 underline-offset-4 hover:underline">
              {site.contact.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
