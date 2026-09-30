import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { Industries } from "@/components/sections/Industries";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { projects } from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Brand films, launch events, social media, studio series, campaigns and celebrations by Powerhouse Studios, Mangaluru.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="Work"
        title={["Different brands.", "Different stories.", "One approach."]}
        intro={
          <p>
            Every project is an opportunity to create something meaningful. The case studies below are samples that show
            how Powerhouse projects will be presented, ready for real clients, credits and footage.
          </p>
        }
      />
      <section className="pb-24 md:pb-40" aria-label="Case studies">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-8 lg:px-12">
          <WorkGrid projects={projects} />
        </div>
      </section>
      <Industries />
      <FinalCTA />
    </>
  );
}
