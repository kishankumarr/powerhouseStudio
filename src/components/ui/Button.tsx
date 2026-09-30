import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/motion";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "text";
  magnetic?: boolean;
  className?: string;
  cursor?: string;
};

/**
 * Primary actions. The label slides up and is replaced on hover; the solid variant
 * uses Powerhouse yellow in every theme.
 */
export function Button({ href, children, variant = "solid", magnetic = true, className, cursor }: Props) {
  const base =
    "group relative inline-flex shrink-0 items-center gap-3 overflow-hidden whitespace-nowrap text-[0.95rem] font-medium leading-none transition-[background-color,color,border-color,box-shadow] duration-500 rounded-ui";
  const styles = {
    solid: "bg-accent px-7 py-[1.05rem] text-accent-ink hover:glow",
    outline: "border border-fg/30 px-7 py-[1rem] text-fg hover:border-fg hover:bg-fg hover:text-bg",
    text: "px-0 py-2 text-fg",
  }[variant];

  const link = (
    <Link href={href} className={`${base} ${styles} ${className ?? ""}`} data-cursor={cursor}>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-cine group-hover:-translate-y-full">{children}</span>
        <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-cine group-hover:translate-y-0">
          {children}
        </span>
      </span>
      <ArrowUpRight
        aria-hidden
        className="size-4 shrink-0 transition-transform duration-500 ease-cine group-hover:rotate-45"
        strokeWidth={1.75}
      />
      {variant === "text" && (
        <span aria-hidden className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-100 bg-current transition-transform duration-500 ease-cine group-hover:origin-left group-hover:scale-x-0" />
      )}
    </Link>
  );

  return magnetic ? <Magnetic strength={0.25}>{link}</Magnetic> : link;
}
