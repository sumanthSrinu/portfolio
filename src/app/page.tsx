import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { HeroScroll } from "@/components/hero-scroll";
import { Nav } from "@/components/nav";
import { Preloader } from "@/components/preloader";
import { ShipBand } from "@/components/ship-band";
import { StatsBand } from "@/components/stats-band";
import { Timeline } from "@/components/timeline";
import { Toolbox } from "@/components/toolbox";
import { WorkBento } from "@/components/work-bento";

export default function Home() {
  return (
    <>
      <noscript>
        <style>{`[data-preloader]{display:none!important}`}</style>
      </noscript>
      <Preloader />
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <HeroScroll />
        <StatsBand />
        <WorkBento />
        <Timeline />
        <ShipBand />
        <Toolbox />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
