import { industries } from "@/content/site";

/** Slow marquee of the industries Powerhouse works across. Pure CSS; pauses on hover. */
export function Industries() {
  const row = (
    <ul className="flex shrink-0 items-center" aria-hidden>
      {industries.map((name) => (
        <li key={name} className="display t-lg flex items-center whitespace-nowrap">
          <span className="px-[0.45em]">{name}</span>
          <span className="inline-block size-[0.16em] bg-accent" />
        </li>
      ))}
    </ul>
  );
  return (
    <section className="border-y border-line py-10 md:py-14" aria-labelledby="industries-title">
      <div className="mx-auto mb-8 flex max-w-[1680px] flex-col justify-between gap-2 px-4 sm:flex-row sm:px-8 lg:px-12">
        <h2 id="industries-title" className="meta">
          Industries we work across
        </h2>
        <p className="meta">Different brands. Different stories. One Powerhouse approach.</p>
      </div>
      <p className="sr-only">{industries.join(", ")}</p>
      <div className="marquee-wrap overflow-hidden">
        <div className="marquee" style={{ ["--marquee-duration" as string]: "80s" }}>
          {row}
          {row}
        </div>
      </div>
    </section>
  );
}
