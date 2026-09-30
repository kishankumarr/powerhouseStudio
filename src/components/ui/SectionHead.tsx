import { RevealText, Reveal } from "@/components/motion";

/** Section opener: a short label, a large display title and optional supporting copy. */
export function SectionHead({
  label,
  title,
  children,
  className,
}: {
  label: string;
  title: string[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-8 md:grid-cols-12 md:items-end ${className ?? ""}`}>
      <div className="md:col-span-8">
        <Reveal>
          <p className="meta mb-5">{label}</p>
        </Reveal>
        <RevealText as="h2" lines={title} className="display t-xl" />
      </div>
      {children && <Reveal className="text-[1rem] leading-relaxed text-muted md:col-span-4 md:pb-2">{children}</Reveal>}
    </div>
  );
}
