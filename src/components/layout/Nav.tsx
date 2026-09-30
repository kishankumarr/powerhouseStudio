"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { Mark } from "@/components/brand/Logo";
import { site } from "@/content/site";
import { useTheme } from "@/components/theme/ThemeProvider";
import { FontPicker } from "@/components/theme/FontPicker";

export function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the menu whenever the route changes.
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 320 && y > prev && !open);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      >
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-700 ${
            scrolled && !open ? "border-b border-line bg-[var(--nav-scrolled)] backdrop-blur-xl" : "border-b border-transparent"
          }`}
        >
          <nav
            aria-label="Main"
            className="mx-auto flex h-16 max-w-[1680px] items-center justify-between px-4 sm:h-20 sm:px-8 lg:px-12"
          >
            <Link
              href="/"
              className={`relative z-10 transition-colors duration-500 ${open ? "text-fg" : scrolled ? "text-fg" : "text-[var(--logo-mark)]"}`}
              aria-label="Powerhouse Studios, home"
            >
              <Mark className="h-7 sm:h-8" label="Powerhouse Studios" />
            </Link>

            <ul className="hidden items-center gap-9 md:flex">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group relative py-2 text-[0.92rem] text-fg"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-cine ${
                        isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="relative z-10 flex items-center gap-3">
              <FontPicker />
              <Link
                href="/contact"
                className="hidden items-center gap-2 bg-accent px-5 py-2.5 text-[0.85rem] font-medium text-accent-ink transition-shadow duration-500 hover:glow rounded-ui lg:inline-flex"
              >
                Start a project
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpenedAt(pathname);
                  setOpen((o) => !o);
                }}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="relative z-10 flex h-10 items-center gap-3 text-[0.9rem] text-fg md:hidden"
              >
                <span>{open ? "Close" : "Menu"}</span>
                <span aria-hidden className="relative block h-3 w-6">
                  <span
                    className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1.5 rotate-45" : "top-0.5"}`}
                  />
                  <span
                    className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <MobileMenu open={open} isActive={isActive} onNavigate={() => setOpen(false)} />
    </>
  );
}

function MobileMenu({
  open,
  isActive,
  onNavigate,
}: {
  open: boolean;
  isActive: (href: string) => boolean;
  onNavigate: () => void;
}) {
  const { motion: m } = useTheme();
  const items = [{ href: "/", label: "Home" }, ...site.nav];
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 flex flex-col bg-bg px-4 pt-24 pb-24 sm:px-8 md:hidden"
          initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2rem)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2rem)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2rem)" }}
          transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
        >
          <nav aria-label="Mobile" className="flex-1">
            <ul className="flex flex-col gap-1">
              {items.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%", transition: { duration: 0.3 } }}
                    transition={{ duration: m.duration, ease: m.ease, delay: 0.25 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={isActive(item.href) && item.href !== "/" ? "page" : undefined}
                      className="display flex items-baseline gap-4 py-1.5 text-[clamp(2.1rem,10vw,3.5rem)]"
                    >
                      <span className="font-sans text-[0.8rem] tracking-normal text-muted normal-case">{String(i).padStart(2, "0")}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6 } }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 gap-4 border-t border-line pt-6 text-[0.9rem]"
          >
            <a href={`mailto:${site.contact.email}`} className="col-span-2 [overflow-wrap:anywhere]">
              {site.contact.email}
            </a>
            <a href={site.contact.phoneHref}>{site.contact.phoneDisplay}</a>
            <a href={site.contact.instagramUrl} target="_blank" rel="noreferrer">
              {site.contact.instagramHandle}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
