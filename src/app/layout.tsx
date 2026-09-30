import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { themeInitScript } from "@/lib/themes";
import { site, founders } from "@/content/site";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { Cursor } from "@/components/cursor/Cursor";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Powerhouse Studios | Creative & Production Company, Mangaluru",
    template: "%s | Powerhouse Studios",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Powerhouse Studios",
    "Mangaluru",
    "Mangalore",
    "creative agency",
    "video production",
    "social media management",
    "event management",
    "event coverage",
    "photography",
    "studio rental",
    "podcast studio",
    "Karnataka",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: "Powerhouse Studios | We create. We connect. We build brands.",
    description: site.description,
    images: [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: "Powerhouse Studios. We create. We connect. We build brands." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Powerhouse Studios | We create. We connect. We build brands.",
    description: site.description,
    images: [`${site.url}/og.png`],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/logo-on-light.png`,
  image: `${site.url}/og.png`,
  description: site.description,
  slogan: site.promise.join(" "),
  email: site.contact.email,
  telephone: "+91 80504 61707",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    addressCountry: site.location.countryCode,
  },
  areaServed: site.location.city,
  sameAs: [site.contact.instagramUrl],
  founder: founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role })),
  knowsAbout: [
    "Social media management",
    "Video production",
    "Video editing",
    "Photography",
    "Event management",
    "Event coverage",
    "Studio rentals",
    "Brand campaigns",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" data-theme="cinematic" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <ThemeProvider>
          <a
            href="#main"
            className="fixed top-3 left-3 z-[200] -translate-y-24 bg-accent px-4 py-2 text-accent-ink focus:translate-y-0"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <ThemeSwitcher />
          <Cursor />
          <div aria-hidden className="grain" />
        </ThemeProvider>
      </body>
    </html>
  );
}
