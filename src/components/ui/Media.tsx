import Image from "next/image";
import type { MediaAsset } from "@/content/media";

/**
 * next/image wrapper that applies the active theme's image treatment.
 * `fill` mode expects a positioned parent with a size.
 */
export function Media({
  asset,
  sizes,
  className,
  fill = true,
  preload = false,
  treat = true,
}: {
  asset: MediaAsset;
  sizes: string;
  className?: string;
  fill?: boolean;
  preload?: boolean;
  treat?: boolean;
}) {
  const common = {
    src: asset.src,
    sizes,
    placeholder: asset.blurDataURL ? ("blur" as const) : ("empty" as const),
    blurDataURL: asset.blurDataURL,
    preload,
    className: `${treat ? "media-treat" : ""} object-cover ${className ?? ""}`,
  };
  return fill ? (
    <Image {...common} alt={asset.alt} fill />
  ) : (
    <Image {...common} alt={asset.alt} width={asset.width} height={asset.height} />
  );
}
