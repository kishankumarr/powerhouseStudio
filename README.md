# Powerhouse Studios website

Marketing site for Powerhouse Studios, Mangaluru. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and Motion.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
pnpm lint
```

## Design directions (themes)

The floating **Theme** control (bottom left) switches between four directions without a reload. The choice is stored in `localStorage` (`ph-theme`) and applied before first paint.

| Theme | Character | Display / body type |
| --- | --- | --- |
| Cinematic (default) | Black, bone, Powerhouse yellow; film grain; full-bleed hero | Bodoni Moda / Hanken Grotesk |
| Editorial | Warm paper, magazine rhythm, framed portrait hero | Instrument Serif / Hanken Grotesk |
| Electric | Stage-light dark, condensed type, glow | Saira (condensed) |
| Minimal | White space, tight type, image band hero | Inter Tight |

All theme differences live as CSS variables in `src/app/globals.css`. Components only reference tokens. To ship a single direction, set `data-theme` on `<html>` in `src/app/layout.tsx` and remove `<ThemeSwitcher />`.

## Where the content lives

| What | File |
| --- | --- |
| Company copy, contact details, beliefs, founders, FAQ, process, industries | `src/content/site.ts` |
| Services (8) and what each includes | `src/content/services.ts` |
| Case studies | `src/content/work.ts` |
| Image references | `src/content/media.ts` |
| Logo layers | `public/brand/*` |

All copy comes from the Powerhouse brief. Nothing is invented. There are no statistics, client names, awards or testimonials.

## Before launch: replace placeholders

1. **Imagery.** Every photo in `public/media/demo` is free-licence Unsplash stock, used as a stand-in. Credits are in `src/content/demo-media.json`, and the footer says it is demo imagery. Put Powerhouse's own photos in `public/media/` and update `src/content/media.ts`. Then delete the footer note in `src/components/layout/Footer.tsx`.
2. **Case studies.** The six projects in `src/content/work.ts` are samples (`sample: true`). For each real project:
   - set `client`, `year` and `location` (a `null` shows as a dashed "to be added" slot);
   - replace `images`;
   - add `video: { src, poster }`;
   - set `sample: false`.
3. **Founder portraits.** Set `portrait` in `founders` (`src/content/site.ts`). Until then the cards show the founders' initials.
4. **Testimonials.** Add real quotes to `testimonials` in `src/content/site.ts`. The section stays hidden while the list is empty.
5. **Hero video (optional).** The hero cycles three stills. A brand reel can replace them in `src/components/sections/Hero.tsx`.

## Contact form

The site is fully static, so the form has no server of its own. It validates in the browser and then:

- **posts the enquiry as JSON** to `NEXT_PUBLIC_FORM_ENDPOINT` if that is set (for example a Formspree form URL), or
- **opens the visitor's email app** with the enquiry written out, addressed to team.powerhousestudios@gmail.com.

On GitHub Pages, set the endpoint as a repository variable named `FORM_ENDPOINT` (Settings → Secrets and variables → Actions → Variables).

## Deploying (GitHub Pages, free)

`.github/workflows/deploy.yml` builds a static export and publishes it on every push to `main`.

1. The repository must be **public**. GitHub Pages is free for public repos only.
2. In the repo, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. Push to `main`. The site appears at `https://<user>.github.io/<repo>/`.

To build the static export locally:

```bash
GITHUB_PAGES=true pnpm build:pages   # outputs to /out
```

With a custom domain (e.g. powerhousestudios.in):

- set `PAGES_BASE_PATH` to an empty string in the workflow;
- set `NEXT_PUBLIC_SITE_URL` to the domain;
- add the domain under Settings → Pages.

## Accessibility and performance

- Honours `prefers-reduced-motion`: scroll choreography, grain, marquee and custom cursor all switch off.
- The custom cursor only appears on devices with a fine pointer.
- Keyboard focus is visible, there is a skip link, the menu and theme panel close with Esc, and the FAQ is a proper accordion.
- Images go through `next/image` with blur placeholders and responsive `sizes`. Only the default theme's fonts are preloaded.
- SEO:
  - per-page metadata, Open Graph and Twitter share image (`public/og.png`);
  - `sitemap.xml` and `robots.txt`;
  - `ProfessionalService` JSON-LD on every page, plus `FAQPage` JSON-LD on `/contact`.
