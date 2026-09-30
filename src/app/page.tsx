import { Hero } from "@/components/sections/Hero";
import { Belief } from "@/components/sections/Belief";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { ServicesList } from "@/components/sections/ServicesList";
import { Difference } from "@/components/sections/Difference";
import { StudioFeature } from "@/components/sections/StudioFeature";
import { Process } from "@/components/sections/Process";
import { Founders } from "@/components/sections/Founders";
import { Industries } from "@/components/sections/Industries";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { projects } from "@/content/work";
import { services } from "@/content/services";

export default function Home() {
  return (
    <>
      <Hero />
      <Belief />

      <section className="py-24 md:py-40" aria-label="Selected work">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-8 lg:px-12">
          <SectionHead label="Selected work" title={["Different brands.", "Different stories."]}>
            <p>
              Brand films, launch nights, monthly social, studio series, campaigns and celebrations. These sample case
              studies show how Powerhouse projects will be presented.
            </p>
          </SectionHead>
          <div className="mt-16 md:mt-28">
            <WorkGrid projects={projects} />
          </div>
          <div className="mt-20 flex justify-center md:mt-32">
            <Button href="/work" variant="outline">
              All work
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32" aria-label="Services">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-8 lg:px-12">
          <SectionHead label="What we do" title={["Eight disciplines.", "One team."]}>
            <p>
              A client may come to us for social media and eventually need a campaign, a shoot or an event. We bring the
              pieces together so the brand experience stays connected.
            </p>
          </SectionHead>
          <div className="mt-14 md:mt-20">
            <ServicesList services={services} />
          </div>
        </div>
      </section>

      <Difference />
      <StudioFeature />
      <Process />
      <Industries />
      <Founders />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
