import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col justify-center px-4 pt-24 sm:px-8 lg:px-12" aria-label="Page not found">
      <div className="mx-auto w-full max-w-[1680px]">
        <p className="meta mb-6">Error 404</p>
        <h1 className="display t-hero">
          Cut.
          <br />
          <span className="display-accent">Wrong take.</span>
        </h1>
        <p className="lede mt-8 text-muted">This page doesn&apos;t exist, or it has moved. Start again from the home page.</p>
        <div className="mt-10">
          <Button href="/">Back to home</Button>
        </div>
      </div>
    </section>
  );
}
