import Image from "next/image";
import { Reveal, RevealText } from "@/components/motion";
import { founders } from "@/content/site";
import { asset } from "@/lib/paths";

type Founder = (typeof founders)[number];

/**
 * Founder cards. Until real portraits are supplied, the frame carries the founder's
 * initials as a typographic plate rather than a stock face.
 */
function Portrait({ founder }: { founder: Founder }) {
  const portrait = founder.portrait as { src: string; width: number; height: number } | null;
  const initials = founder.name
    .split(" ")
    .map((w) => w[0])
    .join("");
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-surface rounded-media">
      {portrait ? (
        <Image src={asset(portrait.src)} alt={founder.name} fill sizes="(min-width: 768px) 40vw, 100vw" className="media-treat object-cover" />
      ) : (
        <>
          <span aria-hidden className="display absolute inset-0 grid place-items-center text-[clamp(7rem,18vw,16rem)] text-fg/[0.08]">
            {initials}
          </span>
          <span className="meta absolute bottom-4 left-4">Portrait to be added</span>
        </>
      )}
    </div>
  );
}

export function Founders({ full = false }: { full?: boolean }) {
  return (
    <section className="py-24 md:py-40" aria-labelledby="founders-title">
      <div className="mx-auto max-w-[1680px] px-4 sm:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="meta mb-5" id="founders-title">
                Founders
              </p>
            </Reveal>
            <RevealText as="h2" lines={["A creator and a strategist,", "under one roof."]} className="display t-xl" />
          </div>
          <Reveal className="text-muted md:col-span-4 md:col-start-9 md:pb-2">
            <p>
              Powerhouse is built around a team of creative thinkers, producers, editors, strategists and execution
              specialists. A strong idea can come from anywhere, and the best work happens when creative, production and
              strategy work together.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-2 md:gap-10">
          {founders.map((f, i) => (
            <Reveal key={f.name} className={i === 1 ? "md:mt-40" : ""} delay={i * 0.1}>
              <article>
                <Portrait founder={f} />
                <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="display t-md">{f.name}</h3>
                  <p className="text-[0.9rem] text-muted">{f.role}</p>
                </div>
                <div className="mt-4 max-w-xl space-y-4 text-[1rem] leading-relaxed text-fg/85">
                  {(full ? f.bio : f.bio.slice(0, 1)).map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
