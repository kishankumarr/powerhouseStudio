import type { Metadata } from "next";
import { Suspense } from "react";
import { Reveal, RevealText } from "@/components/motion";
import { ContactForm } from "@/components/contact/ContactForm";
import { Faq } from "@/components/contact/Faq";
import { faqs, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Powerhouse Studios in Mangaluru. Call 80504 61707, email team.powerhousestudios@gmail.com or send an enquiry.",
  alternates: { canonical: "/contact" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const details = [
  { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { label: "Phone", value: site.contact.phoneDisplay, href: site.contact.phoneHref },
  { label: "Instagram", value: site.contact.instagramHandle, href: site.contact.instagramUrl, external: true },
  { label: "Studio", value: `${site.location.city}, ${site.location.region}` },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="pt-36 pb-20 md:pt-48 md:pb-32" aria-label="Contact Powerhouse Studios">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-8 lg:px-12">
          <Reveal>
            <p className="meta mb-6">Have a project in mind?</p>
          </Reveal>
          <RevealText as="h1" lines={["Let's talk."]} className="display t-hero" animate delay={0.15} />

          <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <Reveal>
                <p className="lede text-muted">
                  Whether you need social media management, video production, editing, photography, event management, event
                  coverage, studio facilities or a complete creative solution, we&apos;d love to understand what you&apos;re
                  building.
                </p>
              </Reveal>
              <dl className="mt-12 grid border-t border-line sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-1">
                {details.map((d) => (
                  <Reveal key={d.label} className="border-b border-line py-5">
                    <dt className="meta mb-1">{d.label}</dt>
                    <dd className="text-[1.1rem] break-words">
                      {d.href ? (
                        <a
                          href={d.href}
                          className="underline-offset-4 hover:underline"
                          {...(d.external ? { target: "_blank", rel: "noreferrer" } : {})}
                        >
                          {d.value}
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </aside>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal>
                <Suspense fallback={<div className="min-h-[32rem]" />}>
                  <ContactForm />
                </Suspense>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-24 md:py-36" aria-labelledby="faq-title">
        <div className="mx-auto grid max-w-[1680px] gap-12 px-4 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="meta mb-5" id="faq-title">
                Frequently asked
              </p>
            </Reveal>
            <RevealText as="h2" lines={["Good", "questions."]} className="display t-lg" />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}
