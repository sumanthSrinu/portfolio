import { certifications, education, skills } from "@/content/profile";
import { Reveal, SectionHeading } from "./reveal";
import { TechLogo } from "./tech-icons";

const marqueeItems: string[] = skills.flatMap((s) => s.items);
// Alternate items between the rows so each row mixes every group.
const rowA = marqueeItems.filter((_, i) => i % 2 === 0);
const rowB = marqueeItems.filter((_, i) => i % 2 === 1);

function LogoRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    // pt leaves room for the hover tag, which sits above the tile.
    <div className="marquee pt-12 pb-2">
      {/* pr matches the gap so the duplicated half lines up exactly at -50%. */}
      <div className={`marquee-track flex w-max gap-4 pr-4 md:gap-5 md:pr-5${reverse ? " marquee-reverse" : ""}`}>
        {[...items, ...items].map((t, i) => (
          <div
            key={i}
            className="group relative grid size-24 shrink-0 place-items-center rounded-2xl border border-white/5 bg-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-neutral-800 md:size-28">
            <TechLogo name={t} className="size-12 text-(--brand) md:size-14" />
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-2 -rotate-6 scale-90 whitespace-nowrap rounded-lg bg-black px-3 py-1.5 text-sm font-semibold text-white opacity-0 shadow-[0_2px_0_#a78bfa] ring-1 ring-white/10 transition duration-200 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
              {t}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Toolbox() {
  return (
    <section id="stack" className="scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading
          label="Toolbox · The stack"
          title="The tools I"
          accent="ship with."
          intro="Mobile first, but comfortable anywhere between the store console and the database migration."
        />
      </div>

      {/* Logo wall: two rows of brand tiles drifting in opposite directions; a
          tilted name tag pops up on hover and the row pauses. Decorative: the
          grouped list below carries the content, so it stays hidden from
          screen readers. */}
      <div aria-hidden="true" className="mb-16 space-y-2 overflow-hidden mask-[linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <LogoRow items={rowA} />
        <LogoRow items={rowB} reverse />
      </div>

      <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={(i % 3) * 0.05}>
            <div className="h-full rounded-3xl border border-line bg-card p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-violet-300">{s.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((t) => (
                  <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-neutral-200">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.05} className="sm:col-span-2 lg:col-span-2">
          <div className="grid h-full gap-6 rounded-3xl border border-line bg-card p-6 sm:grid-cols-2">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-violet-300">Education</h3>
              <p className="mt-4 font-medium">{education.degree}</p>
              <p className="text-sm text-muted">
                {education.school} · {education.dates}
              </p>
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-violet-300">Certifications</h3>
              <ul className="mt-4 space-y-1 text-sm text-neutral-200">
                {certifications.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
