import { certifications, education, skills } from "@/content/profile";
import { Reveal, SectionHeading } from "./reveal";
import { CurvedMarquee } from "./curved-marquee";

// Listed in the grouped cards below, but left out of the logo rows.
const notInMarquee = new Set(["StoreKit 2", "Razorpay", "Python"]);
const marqueeItems: string[] = skills.flatMap((s) => s.items).filter((t) => !notInMarquee.has(t));
// Alternate items between the rows so each row mixes every group.
const rowA = marqueeItems.filter((_, i) => i % 2 === 0);
const rowB = marqueeItems.filter((_, i) => i % 2 === 1);

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

      {/* Logo wall: two rows of brand tiles curving past in opposite directions; a
          tilted name tag pops up on hover and the row pauses. Decorative: the
          grouped list below carries the content, so it stays hidden from
          screen readers. */}
      <div aria-hidden="true" className="mb-16 overflow-hidden pt-6 mask-[linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <CurvedMarquee items={rowA} />
        <CurvedMarquee items={rowB} reverse />
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
