import Link from "next/link";
import { Lockup } from "@/components/brand/Logo";
import { site } from "@/content/site";
import { services } from "@/content/services";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line pt-20 pb-24">
      <div className="mx-auto max-w-[1680px] px-4 sm:px-8 lg:px-12">
        <div className="grid gap-14 xl:grid-cols-12">
          <div className="xl:col-span-4">
            <Lockup className="w-44 sm:w-52" />
            <p className="mt-8 max-w-xs text-[0.95rem] text-muted">
              {site.promise.join(" ")}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 text-[0.95rem] sm:grid-cols-3 xl:col-span-8">
            <div>
              <h2 className="meta mb-4">Studio</h2>
              <ul className="space-y-2">
                {[{ href: "/", label: "Home" }, ...site.nav].map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="hover:text-accent-text">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="meta mb-4">Services</h2>
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services#${s.slug}`} className="hover:text-accent-text">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="meta mb-4">Contact</h2>
              <address className="space-y-2 not-italic">
                <p>
                  {site.location.city}, {site.location.region}
                </p>
                <p>
                  <a href={site.contact.phoneHref} className="hover:text-accent-text">
                    {site.contact.phoneDisplay}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${site.contact.email}`} className="[overflow-wrap:anywhere] hover:text-accent-text">
                    {site.contact.email}
                  </a>
                </p>
                <p>
                  <a href={site.contact.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-accent-text">
                    Instagram {site.contact.instagramHandle}
                  </a>
                </p>
              </address>
            </div>
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-line pt-6 text-[0.78rem] text-muted sm:flex-row sm:justify-between">
          <p>
            © {year} {site.name}. {site.location.city}, {site.location.region}.
          </p>
          <p>Demo imagery from Unsplash, to be replaced with Powerhouse work.</p>
        </div>
      </div>
    </footer>
  );
}
