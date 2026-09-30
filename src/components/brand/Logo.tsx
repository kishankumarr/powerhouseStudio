import type { CSSProperties } from "react";
import { asset } from "@/lib/paths";

/**
 * The Powerhouse logo is split into mask layers (see /public/brand) so every theme
 * can recolour it: black ink, the yellow wordmark letters and the white "STUDIOS" plate.
 */
function Layer({ src, color }: { src: string; color: string }) {
  const style: CSSProperties = {
    backgroundColor: color,
    WebkitMaskImage: `url(${asset(src)})`,
    maskImage: `url(${asset(src)})`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  };
  return <span aria-hidden className="absolute inset-0 transition-colors duration-700" style={style} />;
}

export function Lockup({ className, label = "Powerhouse Studios" }: { className?: string; label?: string }) {
  return (
    <span role="img" aria-label={label} className={`relative block aspect-[1400/865] ${className ?? ""}`}>
      <Layer src="/brand/lockup-paper.png" color="var(--logo-paper)" />
      <Layer src="/brand/lockup-ink-mark.png" color="var(--logo-mark)" />
      <Layer src="/brand/lockup-ink-bar.png" color="var(--logo-bar)" />
      <Layer src="/brand/lockup-accent.png" color="var(--logo-accent)" />
    </span>
  );
}

export function Mark({ className, label = "Powerhouse Studios" }: { className?: string; label?: string }) {
  return (
    <span role="img" aria-label={label} className={`relative block aspect-[1379/651] ${className ?? ""}`}>
      <Layer src="/brand/mark-paper.png" color="var(--logo-paper)" />
      <Layer src="/brand/mark-ink.png" color="currentColor" />
    </span>
  );
}
