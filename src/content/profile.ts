// All site copy lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Sumanth Srinivas",
  role: "React Native Engineer",
  focus: "Mobile Platform & Release",
  location: "Chennai, India",
  email: "sumanthsrinivas.g@gmail.com",
  phone: "+91 7013446373",
  linkedin: "https://www.linkedin.com/in/sumanth-srinivas/",
  github: "https://github.com/sumanthSrinu",
};

export const heroBeats = [
  {
    label: "Build · The intro",
    eyebrow: `${profile.name} — ${profile.role}`,
    lead: "I ship apps that live in",
    accent: "your pocket.",
    body: "React Native engineer with 3 years of shipping bare-workflow iOS and Android apps end to end: features, payments, analytics, and the pipeline that gets them to the store.",
  },
  {
    label: "Sign · The proof",
    lead: "My builds sign",
    accent: "themselves.",
    body: "At Astrosure I own the mobile frontend. I led the revamp to the new UI, rebuilding the core screens from Figma on personalised v2 APIs, and rebuilt the release pipeline on GitHub Actions + Fastlane: any branch, any environment, store-ready Android builds in 8–\u206010 minutes.",
  },
  {
    label: "Ship · The invite",
    lead: "Merged. Signed.",
    accent: "Shipped.",
    body: "Scroll for the full changelog, or say hi. I reply faster than a TestFlight review.",
  },
] as const;

export const stats = [
  { value: 3, suffix: "+", label: "years shipping iOS & Android" },
  { value: 240, suffix: "+", label: "commits across mobile, backend & CI" },
  { value: 10, from: 8, prefix: "8–", suffix: " min", label: "Android build → Play upload" },
  { value: 4, suffix: "", label: "analytics tools kept in event parity" },
] as const;

export type Role = {
  title: string;
  company: string;
  note?: string;
  location: string;
  dates: string;
  summary: string;
  highlights: { title?: string; text: string }[];
};

export const experience: Role[] = [
  {
    title: "React Native Engineer",
    company: "Astrosure",
    note: "via Doodleblue Innovations till Jan 2026",
    location: "Chennai",
    dates: "Oct 2025 — Present",
    summary:
      "Own the mobile app end to end: the release dashboard, the app\u2019s v2 UI revamp, analytics, deep links, payments and full-stack features.",
    highlights: [
      {
        title: "Release dashboard & CI/CD",
        text: "Rebuilt the iOS/Android CI/CD pipeline on GitHub Actions + Fastlane (code signing, build-number reconciliation) and built an internal dashboard to build any branch across dev/preprod/prod with version overrides, release notes, concurrency locks, build history and live store-version tracking.",
      },
      {
        title: "App revamp to the new UI",
        text: "Rebuilt the core screens (horoscope, transits, onboarding, charts) from Figma on personalised v2 APIs, added in-app PDF downloads and image sharing, and fixed streaming bugs and a session data leak on logout.",
      },
      {
        title: "Fast store-ready builds",
        text: "Android AAB built, signed and uploaded to Play in 8–10 minutes, with per-run build times tracked in the dashboard.",
      },
      {
        title: "Analytics & attribution",
        text: "Instrumented CleverTap, AppsFlyer, RudderStack and GA4 across app and web: identity merging, per-destination routing, a shared event_id for reconciliation, OneLink web-to-app CTAs, duplicate events removed and parity across platforms.",
      },
      {
        title: "Deep linking & notifications",
        text: "Built deep link and push routing (custom schemes, universal links, CleverTap wzrk_dl, OneLink) with Redux-persisted state across cold and warm starts, and fixed a duplicate route pattern that crashed all incoming links.",
      },
      {
        title: "Payments",
        text: "iOS subscriptions and one-time purchases with react-native-iap (StoreKit 2) and Razorpay on Android, including result flows and funnel tracking.",
      },
      {
        title: "Full-stack features",
        text: "Shipped an NPS system end to end, a WhatsApp notification channel with delivery webhooks, and an audio content module on FastAPI + media CDN with admin roles and Google sign-in.",
      },
      {
        title: "Platform compliance",
        text: "Led the React Native 0.74 → 0.78 upgrade, made native libraries 16 KB page-size compatible for Google Play, and added iOS 27 scene-lifecycle and App Tracking Transparency support.",
      },
    ],
  },
  {
    title: "React & React Native Developer",
    company: "Stamin",
    location: "Chennai",
    dates: "Nov 2024 — Aug 2025",
    summary: "Cross-platform SaaS fitness app for iOS and Android, plus its admin dashboard.",
    highlights: [
      { text: "Built health tracking (calories, steps, water intake), a trainer assessment and analytics module, and a follow-up engagement system." },
      { text: "Implemented Firebase Authentication with Google Sign-In and Firestore." },
      { text: "Improved rendering performance with memoisation, optimised FlatList usage and leaner state." },
      { text: "Managed Play Store releases (signing, debugging, rollout) and built a responsive ReactJS admin dashboard." },
    ],
  },
  {
    title: "React & React Native Developer",
    company: "OrgFour",
    location: "Remote",
    dates: "Oct 2023 — Oct 2024",
    summary: "Event and networking app built with Expo and a configuration-driven UI.",
    highlights: [
      { text: "Built a React Native (Expo) app with authentication and dynamic, configuration-driven UI." },
      { text: "Developed a real-time chat interface with emoji support and message search." },
      { text: "Implemented event management, user networking and profile features." },
      { text: "Built an admin portal for managing layouts, surveys and polls." },
    ],
  },
];

export const skills = [
  { group: "Mobile", items: ["React Native CLI 0.84", "React Navigation", "Reanimated", "StoreKit 2", "Razorpay", "Xcode", "CocoaPods", "Gradle", "Expo"] },
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python"] },
  { group: "State & Data", items: ["Redux Toolkit", "TanStack Query", "Zustand", "REST", "Axios", "Firebase"] },
  { group: "CI/CD & Release", items: ["GitHub Actions", "Fastlane", "TestFlight", "Play Console", "Code signing", "Self-hosted runners"] },
  { group: "Analytics & Attribution", items: ["CleverTap", "AppsFlyer", "RudderStack", "GA4"] },
  { group: "Web", items: ["React", "Next.js", "Tailwind CSS"] },
  { group: "Tools", items: ["Git", "Jest", "Jira", "Figma", "Claude Code"] },
] as const;

export const project = {
  name: "Movies App",
  tagline: "A Netflix-style streaming UI",
  text: "OTT-style ReactJS app on the TMDb API with authentication, a watchlist and responsive carousels.",
  stack: ["React", "TMDb API", "Auth"],
  demo: "https://moviesappsuman.ccbp.tech/",
};

// Apps shipped at each company. Add store/web links as they become available;
// a link button only renders when its URL is set. `icon` is a path under /public, e.g. "/apps/astrosure.png".
export type ShippedApp = {
  name: string;
  company: string;
  role: string;
  /** Short category shown above the name, e.g. "Fitness". */
  category: string;
  /** Brand colour sampled from the logo; drives the panel's glow. */
  color: string;
  /** What you built on it, shown as a short list in the open panel. */
  highlights: string[];
  icon?: string;
  appStore?: string;
  playStore?: string;
  web?: string;
};

export const shippedApps: ShippedApp[] = [
  {
    name: "Astrosure",
    company: "Astrosure",
    role: "Release dashboard, v2 UI revamp, payments, analytics and deep links.",
    category: "Astrology",
    color: "#3aa6a8",
    highlights: ["Release dashboard & CI/CD", "App revamp to the new UI", "StoreKit 2 & Razorpay payments", "Analytics, deep links & push"],
    icon: "/apps/astrosure.png",
    appStore: "https://apps.apple.com/app/astrosure-ai/id6739531176",
    playStore: "https://play.google.com/store/apps/details?id=com.astrosureai",
    web: "https://astrosure.ai",
  },
  {
    name: "Stamin",
    company: "Stamin",
    role: "Health tracking, trainer assessments and Play Store releases.",
    category: "Fitness",
    color: "#f07a3a",
    highlights: ["Calorie, step & water tracking", "Trainer assessment & analytics", "Firebase Auth with Google Sign-In", "Play Store releases"],
    icon: "/apps/stamin-icon.jpg",
    appStore: "https://apps.apple.com/app/stamin/id6472804697",
    playStore: "https://play.google.com/store/apps/details?id=com.app_stamin",
    web: "https://stamin.in",
  },
  {
    name: "OrgFour",
    company: "OrgFour",
    role: "Expo app with real-time chat, events and networking.",
    category: "Events & networking",
    color: "#7b61d9",
    highlights: ["Real-time chat with message search", "Event management & networking", "Configuration-driven UI", "Admin portal for surveys & polls"],
    icon: "/apps/orgfour-icon.png",
    appStore: "https://apps.apple.com/app/orgfour/id6474268517",
    playStore: "https://play.google.com/store/apps/details?id=com.orgchats.appbeta001",
    web: "https://www.orgfour.com",
  },
];

export const education = {
  degree: "B.Tech in Mechanical Engineering",
  school: "PBR VITS, Nellore",
  dates: "2014 — 2018",
};

export const certifications = [
  "Advanced React Native — Udemy",
  "Responsive Web Design — freeCodeCamp",
  "JavaScript — Dynamic Web Applications",
];
