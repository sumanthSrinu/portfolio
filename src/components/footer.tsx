import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            sumanth srinivas<span className="text-gradient">.</span>
          </p>
          <p>
            {profile.role} · {profile.location}
          </p>
        </div>
        <p className="font-mono text-xs">Built with Next.js, Tailwind CSS & Motion. Shipped, naturally.</p>
        <a href="#top" className="inline-flex min-h-11 items-center hover:text-ink">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
