import { media, type MediaAsset } from "./media";

export type Project = {
  slug: string;
  title: string;
  format: string;
  service: string;
  industry: string;
  /** null = not supplied yet; rendered as a visible placeholder slot. */
  client: string | null;
  year: string | null;
  location: string | null;
  summary: string;
  approach: { stage: string; body: string }[];
  deliverables: string[];
  highlights: string[];
  images: MediaAsset[];
  video: { src: string; poster?: string } | null;
  testimonial: { quote: string; name: string; role?: string } | null;
  /**
   * Sample case studies show how real Powerhouse projects will be presented.
   * Set to false once client, credits and imagery are real.
   */
  sample: boolean;
};

export const projects: Project[] = [
  {
    slug: "the-brand-film",
    title: "The Brand Film",
    format: "Brand film",
    service: "Video Production",
    industry: "Hospitality",
    client: null,
    year: null,
    location: null,
    summary:
      "A hospitality brand film built around a single idea: show how the place feels before anyone walks in. Concept, script, shoot and edit handled by one team.",
    approach: [
      { stage: "Understand", body: "Who the guests are, what they remember afterwards and where the film will be seen." },
      { stage: "Create", body: "A concept and script shaped around the brand's atmosphere rather than a list of amenities." },
      { stage: "Produce", body: "Location shoot across the property with a small, quiet crew so service carries on around us." },
      { stage: "Deliver", body: "A hero film plus platform cuts for reels, stories and the website header." },
    ],
    deliverables: ["Brand film", "Social media cuts", "Reels", "Colour correction", "Sound design"],
    highlights: ["Concept to delivery by one team", "Hero film and platform cut-downs", "Stills pulled for the visual library"],
    images: media.project("p1"),
    video: null,
    testimonial: null,
    sample: true,
  },
  {
    slug: "the-launch-night",
    title: "The Launch Night",
    format: "Launch event",
    service: "Event Management & Production",
    industry: "Corporate brands",
    client: null,
    year: null,
    location: null,
    summary:
      "A product launch planned, produced and covered end to end: venue, stage, sound and light, artists, guests and the content that keeps working after the night ends.",
    approach: [
      { stage: "Understand", body: "The product story, the guest list and the one moment the evening needs to land." },
      { stage: "Create", body: "Stage design, event branding and a run of show built around the reveal." },
      { stage: "Produce", body: "Venue coordination, technical production, emcee and artist coordination, on-ground team." },
      { stage: "Deliver", body: "Same-night reels where applicable, a highlight film and a full photo set." },
    ],
    deliverables: ["Event planning", "Stage setup", "Sound and lighting", "Event branding", "Highlight film", "Event photography"],
    highlights: ["One team from plan to highlight film", "Reveal moment designed for camera", "Post-event content pack"],
    images: media.project("p2"),
    video: null,
    testimonial: null,
    sample: true,
  },
  {
    slug: "the-always-on-feed",
    title: "The Always-On Feed",
    format: "Monthly social",
    service: "Social Media Management",
    industry: "Fitness",
    client: null,
    year: null,
    location: null,
    summary:
      "Month-by-month social media for a fitness brand: strategy, shoots, reels and publishing, measured every month and adjusted as the audience responds.",
    approach: [
      { stage: "Understand", body: "The brand's voice, its members and what they actually stop scrolling for." },
      { stage: "Create", body: "Content pillars, a monthly plan and creative concepts for reels and carousels." },
      { stage: "Produce", body: "Recurring shoot days that batch reels, stills and stories efficiently." },
      { stage: "Deliver", body: "Publishing, community management and monthly performance tracking." },
    ],
    deliverables: ["Social media strategy", "Reels", "Carousels", "Stories", "Captions", "Monthly performance tracking"],
    highlights: ["Consistent, recognisable presence", "Batch shoot days", "Monthly reporting loop"],
    images: media.project("p3"),
    video: null,
    testimonial: null,
    sample: true,
  },
  {
    slug: "the-studio-sessions",
    title: "The Studio Sessions",
    format: "Podcast & creator series",
    service: "Studio Rentals",
    industry: "Creators",
    client: null,
    year: null,
    location: null,
    summary:
      "A recurring podcast and YouTube series recorded in the Powerhouse studio, with multi-camera capture, editing and short-form clips cut for every platform.",
    approach: [
      { stage: "Understand", body: "The creator's format, audience and publishing rhythm." },
      { stage: "Create", body: "Set look, camera plan and an episode template that stays consistent." },
      { stage: "Produce", body: "Studio recording with podcast video production." },
      { stage: "Deliver", body: "Full episodes, podcast edits, subtitles and reels cut from each session." },
    ],
    deliverables: ["Studio access", "Podcast video production", "Podcast editing", "YouTube videos", "Reels", "Subtitles and captions"],
    highlights: ["Controlled studio environment", "Episode template", "Clips for every platform"],
    images: media.project("p4"),
    video: null,
    testimonial: null,
    sample: true,
  },
  {
    slug: "the-campaign",
    title: "The Campaign",
    format: "Fashion campaign",
    service: "Brand Content & Campaigns",
    industry: "Fashion",
    client: null,
    year: null,
    location: null,
    summary:
      "A seasonal fashion campaign carried across film, photography, creator content and a launch moment, all from one creative direction.",
    approach: [
      { stage: "Understand", body: "The collection, the customer and what the season needs to say." },
      { stage: "Create", body: "Campaign concept, creative direction and a shot list covering every format." },
      { stage: "Produce", body: "Campaign photography and film, plus creator content from the same set." },
      { stage: "Deliver", body: "Digital creatives, social rollout and post-campaign content." },
    ],
    deliverables: ["Campaign concept", "Creative direction", "Campaign photography", "Campaign videos", "Influencer/creator content", "Digital creatives"],
    highlights: ["One idea across every format", "Film and stills from one set", "Creator content built in"],
    images: media.project("p5"),
    video: null,
    testimonial: null,
    sample: true,
  },
  {
    slug: "the-celebration",
    title: "The Celebration",
    format: "Private celebration",
    service: "Event Management & Production",
    industry: "Private celebrations",
    client: null,
    year: null,
    location: null,
    summary:
      "An intimate celebration planned and produced by Powerhouse, from décor and entertainment to the photographs and film the family will keep.",
    approach: [
      { stage: "Understand", body: "The family, the traditions and the moments that must not be missed." },
      { stage: "Create", body: "Décor direction, entertainment plan and a coverage plan for every ritual." },
      { stage: "Produce", body: "Venue, décor, sound and lighting, DJ and on-ground coordination." },
      { stage: "Deliver", body: "Event photography, a highlight film and reels to share." },
    ],
    deliverables: ["Event planning", "Event décor", "Sound and lighting", "DJ", "Event photography", "Highlight film"],
    highlights: ["Planning and coverage by one team", "Décor designed for camera", "A film to keep"],
    images: media.project("p6"),
    video: null,
    testimonial: null,
    sample: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
