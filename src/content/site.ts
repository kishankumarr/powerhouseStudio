/**
 * Single source of truth for Powerhouse Studios copy and contact details.
 * Everything here comes from the brief supplied by the client.
 */
export const site = {
  name: "Powerhouse Studios",
  shortName: "Powerhouse",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://powerhousestudios.in").replace(/\/$/, ""),
  description:
    "Powerhouse Studios is a creative and production company in Mangaluru, Karnataka: social media, video production, editing, photography, event management, event coverage, studio rentals and brand campaigns under one roof.",
  promise: ["We create.", "We connect.", "We build brands."],
  promiseLines: [
    "We create content that captures attention.",
    "We connect brands with people.",
    "We build communication that creates long-term value.",
  ],
  intro:
    "A creative and production company built to help brands become more visible, more memorable and more impactful.",
  location: {
    city: "Mangaluru",
    region: "Karnataka",
    country: "India",
    countryCode: "IN",
    // Public coordinates of Mangaluru city, used only as a typographic detail.
    coords: "12.91° N, 74.85° E",
  },
  contact: {
    email: "team.powerhousestudios@gmail.com",
    phoneDisplay: "80504 61707",
    phoneHref: "tel:+918050461707",
    instagramHandle: "@powerhousestudios.in",
    instagramUrl: "https://www.instagram.com/powerhousestudios.in/",
    website: "powerhousestudios.in",
  },
  nav: [
    { href: "/work", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/studio", label: "Studio" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export const beliefs = [
  {
    word: "Visibility",
    title: "Visibility creates opportunity.",
    body: "A good business can exist without being visible, but it becomes much harder to grow when people don't know it exists.",
  },
  {
    word: "Trust",
    title: "Visibility builds trust.",
    body: "When people repeatedly see a brand, understand what it stands for and experience its communication consistently, familiarity begins to develop.",
  },
  {
    word: "Growth",
    title: "Trust supports business growth.",
    body: "Our work is designed to help brands communicate better, stay relevant and build stronger relationships with their audience.",
  },
] as const;

export const difference = {
  lead: "We are not here to simply produce another reel.",
  sometimes: [
    "one video.",
    "an entire campaign.",
    "managing a brand's social media every month.",
    "producing an event from the ground up.",
    "helping a business figure out what to say next.",
  ],
  close: "The requirement may change. The approach remains the same: understand, create, execute and build.",
} as const;

export const reasons = [
  {
    title: "One creative partner",
    body: "Instead of managing multiple vendors, brands work with one team across content, production and events.",
  },
  {
    title: "Creative + execution",
    body: "We don't stop at ideas. We take them into production and deliver the final output.",
  },
  {
    title: "Content that has purpose",
    body: "We focus on why the content is being created, not just how it looks.",
  },
  {
    title: "Flexible production",
    body: "We build our approach around the project instead of forcing every client into the same production model.",
  },
  {
    title: "End-to-end capability",
    body: "From strategy and concepts to production, editing and final delivery, we can manage the complete creative process.",
  },
  {
    title: "Local understanding, professional production",
    body: "Based in Mangaluru, we understand the local market while bringing a professional production mindset to every project.",
  },
] as const;

export const industries = [
  "Retail",
  "Restaurants",
  "Hospitality",
  "Healthcare",
  "Education",
  "Real estate",
  "Fitness",
  "Lifestyle",
  "Fashion",
  "Automotive",
  "Corporate brands",
  "Events",
  "Personal brands",
  "Creators",
  "Startups",
  "Local businesses",
] as const;

export const engagements = [
  { title: "A single project", body: "A video, shoot, event, campaign or editing requirement." },
  { title: "Ongoing content", body: "Regular social media and content production for your brand." },
  { title: "A campaign", body: "A complete creative campaign requiring multiple formats and deliverables." },
  { title: "An event", body: "Planning, production, management and coverage." },
  { title: "A complete creative partner", body: "A long-term relationship covering multiple creative and production requirements." },
] as const;

export const audiences = [
  {
    title: "For businesses & brands",
    lead: "Your business already has a story. Our job is to help you tell it better.",
    body: "Whether you are launching a new brand, expanding an existing business, introducing a product, running a campaign or simply looking to improve your digital presence, Powerhouse can help you build the content and communication around it.",
  },
  {
    title: "For creators",
    lead: "Creators need more than a camera.",
    body: "They need a creative environment, production support and content that keeps up with their ideas. We provide the production support so creators can focus on creating.",
  },
  {
    title: "For events",
    lead: "An event should be experienced, not just organised.",
    body: "From the first planning conversation to the final highlight video, our team can be involved throughout the journey.",
  },
] as const;

export const founders = [
  {
    name: "Sharan Chilimbi",
    role: "Co-Founder, Creative & Content",
    bio: [
      "Sharan is a Tulu creator, influencer, host, actor, dancer and YouTuber known for building strong connections with audiences through entertainment and digital content.",
      "His experience as a creator and performer brings a strong understanding of audience behaviour, storytelling and content creation to Powerhouse Studios, with a focus on content that feels authentic, engaging and culturally relevant.",
    ],
    // Replace with a real portrait: { src: "/media/team/sharan.jpg", width, height }
    portrait: null,
  },
  {
    name: "Shravan Rajani",
    role: "Co-Founder, Digital & Creative Strategy",
    aka: "Shravan Bro",
    bio: [
      "Shravan brings together digital thinking, creative strategy and entrepreneurial experience. Known as Shravan Bro, he is a fitness creator and entrepreneur with an understanding of digital audiences, personal branding and content-led growth.",
      "At Powerhouse, he focuses on strategy, digital direction and building creative solutions that connect business objectives with audience communication.",
    ],
    portrait: null,
  },
] as const;

export const vision =
  "To build Powerhouse Studios into a leading creative and production company from Mangaluru, creating work that reaches audiences beyond the region.";
export const mission =
  "To help brands communicate better through creativity, content and experiences.";

export const faqs = [
  {
    q: "What does Powerhouse Studios do?",
    a: "Powerhouse Studios is a creative and production company offering social media management, video production, video editing, photography, event management, event production, event coverage, studio rentals and campaign content.",
  },
  {
    q: "Do you work only with large brands?",
    a: "No. We work with businesses of different sizes, including startups, local businesses, established brands, creators and organisations.",
  },
  {
    q: "Can Powerhouse handle an entire project?",
    a: "Yes. Depending on the requirement, Powerhouse can manage projects from creative planning through production, editing and final delivery.",
  },
  {
    q: "Do you provide social media management?",
    a: "Yes. Our social media services can include strategy, content planning, reels, posters, stories, publishing, community management and performance tracking.",
  },
  {
    q: "Do you provide event management?",
    a: "Yes. We provide end-to-end event management and production solutions, including planning, décor, sound, lighting, entertainment coordination, on-ground execution and event coverage.",
  },
  {
    q: "Can you edit videos using footage provided by the client?",
    a: "Yes. We can work with client-provided footage for video editing projects, depending on the requirement.",
  },
  {
    q: "Do you provide studio space?",
    a: "Yes. Powerhouse Studios offers studio facilities for content production, photography, video shoots, interviews, podcasts and creator content.",
  },
  {
    q: "Do you work outside Mangaluru?",
    a: "Yes. Projects can be undertaken outside Mangaluru depending on the scope, production requirements and location.",
  },
] as const;

export const processSteps = [
  { title: "Understand", body: "We understand the brand, requirement, audience and objective." },
  { title: "Create", body: "We develop ideas, concepts, scripts, visuals and creative directions." },
  { title: "Produce", body: "We bring the idea to life through production, shoots, events and content creation." },
  { title: "Deliver", body: "We edit, refine and prepare the final content for the required platforms and purposes." },
] as const;

export const processQuestions = [
  "What is the brand?",
  "Who is the audience?",
  "What does the brand want to communicate?",
  "What is the objective?",
  "Where will the content be used?",
  "What does success look like?",
] as const;

/**
 * Real client testimonials go here. The section renders nothing while this is empty,
 * so no quote is ever invented.
 */
export const testimonials: { quote: string; name: string; company?: string; project?: string }[] = [];
