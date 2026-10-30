import {
  BellRing,
  Box,
  Braces,
  Compass,
  FlaskConical,
  KeyRound,
  Server,
  Sparkles,
  Waypoints,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  siApple,
  siAppstore,
  siAxios,
  siClaude,
  siCocoapods,
  siDatadog,
  siExpo,
  siFastapi,
  siFastlane,
  siFigma,
  siFirebase,
  siGit,
  siGithubactions,
  siGoogleanalytics,
  siGoogleplay,
  siGradle,
  siJavascript,
  siJest,
  siJira,
  siNextdotjs,
  siPython,
  siRazorpay,
  siReact,
  siReactquery,
  siRedux,
  siSentry,
  siSqlalchemy,
  siTailwindcss,
  siTypescript,
  siXcode,
  type SimpleIcon,
} from "simple-icons";

/** A brand logo (Simple Icons) or, where no brand mark exists, a Lucide outline icon. */
type TechIcon = { brand: SimpleIcon } | { lucide: LucideIcon };

const ICONS: Record<string, TechIcon> = {
  "React Native CLI 0.84": { brand: siReact },
  "React Navigation": { lucide: Compass },
  Reanimated: { lucide: Sparkles },
  "StoreKit 2": { brand: siApple },
  Razorpay: { brand: siRazorpay },
  Xcode: { brand: siXcode },
  CocoaPods: { brand: siCocoapods },
  Gradle: { brand: siGradle },
  Expo: { brand: siExpo },
  TypeScript: { brand: siTypescript },
  JavaScript: { brand: siJavascript },
  Python: { brand: siPython },
  "Redux Toolkit": { brand: siRedux },
  "TanStack Query": { brand: siReactquery },
  Zustand: { lucide: Box },
  REST: { lucide: Braces },
  Axios: { brand: siAxios },
  Firebase: { brand: siFirebase },
  "GitHub Actions": { brand: siGithubactions },
  Fastlane: { brand: siFastlane },
  TestFlight: { brand: siAppstore },
  "Play Console": { brand: siGoogleplay },
  "Code signing": { lucide: KeyRound },
  "Self-hosted runners": { lucide: Server },
  CleverTap: { lucide: BellRing },
  AppsFlyer: { lucide: Waypoints },
  RudderStack: { lucide: Workflow },
  GA4: { brand: siGoogleanalytics },
  "Datadog RUM": { brand: siDatadog },
  Sentry: { brand: siSentry },
  React: { brand: siReact },
  "Next.js": { brand: siNextdotjs },
  "Tailwind CSS": { brand: siTailwindcss },
  FastAPI: { brand: siFastapi },
  SQLAlchemy: { brand: siSqlalchemy },
  Alembic: { lucide: FlaskConical },
  Git: { brand: siGit },
  Jest: { brand: siJest },
  Jira: { brand: siJira },
  Figma: { brand: siFigma },
  "Claude Code": { brand: siClaude },
};

/**
 * Hover colour: the brand's own colour, or white when that colour is too dark
 * to read on the black page (Apple, Next.js, Expo, Gradle, …).
 */
function hoverColor(hex: string): string {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance < 0.35 ? "#ffffff" : `#${hex}`;
}

/** The logo for a tech name, sized by the caller's font size (1em). Null if unmapped. */
export function TechLogo({ name, className }: { name: string; className?: string }) {
  const icon = ICONS[name];
  if (!icon) return null;
  if ("lucide" in icon) {
    const Icon = icon.lucide;
    return <Icon className={className} strokeWidth={1.75} style={{ ["--brand" as string]: "#c4b5fd" }} />;
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ ["--brand" as string]: hoverColor(icon.brand.hex) }}>
      <path d={icon.brand.path} />
    </svg>
  );
}
