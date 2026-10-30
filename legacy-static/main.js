(() => {
  const root = document.documentElement;
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Nav: blur on scroll, hide on scroll-down, active link ---------- */
  const nav = document.getElementById('nav');
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 12);
    nav.classList.toggle('is-hidden', y > 400 && y > lastY && !nav.contains(document.activeElement));
    lastY = y;
  }, { passive: true });

  const links = [...document.querySelectorAll('.nav__links a')];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${e.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['work', 'skills', 'experience', 'contact'].forEach((id) => observer.observe(document.getElementById(id)));

  /* ---------- Cursor spotlight on cards ---------- */
  document.querySelectorAll('.spot').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  /* ---------- Release pipeline ticker ---------- */
  const steps = [...document.querySelectorAll('[data-step]')];
  const doneLine = document.querySelector('.t-done');
  const bar = document.querySelector('.progress__bar');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showFinished() {
    steps.forEach((s) => { s.classList.remove('is-running'); s.classList.add('is-done'); });
    doneLine.style.opacity = 1;
    bar.style.transform = 'scaleX(1)';
  }

  function runPipeline() {
    let i = 0;
    steps.forEach((s) => s.classList.remove('is-running', 'is-done'));
    doneLine.style.opacity = 0;
    bar.style.transition = 'none';
    bar.style.transform = 'scaleX(0)';
    const tick = () => {
      if (i > 0) steps[i - 1].classList.replace('is-running', 'is-done');
      if (i === steps.length) {
        doneLine.style.transition = 'opacity .4s ease';
        doneLine.style.opacity = 1;
        setTimeout(runPipeline, 3200);
        return;
      }
      steps[i].classList.add('is-running');
      bar.style.transition = 'transform .7s cubic-bezier(.16,1,.3,1)';
      bar.style.transform = `scaleX(${(i + 1) / steps.length})`;
      i += 1;
      setTimeout(tick, 650 + Math.random() * 450);
    };
    setTimeout(tick, 500);
  }

  if (reduceMotion) showFinished();
  else runPipeline();

  /* ---------- GSAP choreography ---------- */
  if (!window.gsap || !window.ScrollTrigger) {
    root.classList.remove('js'); // CDN failed: show everything statically
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  if (window.SplitText) gsap.registerPlugin(SplitText);

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // Hero: per-character headline (SplitText preset), then staggered copy
    const title = document.getElementById('hero-title');
    gsap.set(title, { visibility: 'visible' });
    gsap.set('.reveal-hero', { opacity: 1 }); // CSS pre-hides; .from() needs the visible end state
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    let split;
    if (window.SplitText) {
      split = new SplitText(title, { type: 'chars', charsClass: 'char' });
      tl.from(split.chars, { opacity: 0, y: 40, rotateX: -60, duration: 0.9, stagger: 0.025 });
    } else {
      tl.from(title, { opacity: 0, y: 24, duration: 0.8 });
    }
    tl.from('.hero__copy .reveal-hero', { opacity: 0, y: 18, duration: 0.8, stagger: 0.08, ease: 'power3.out' }, 0.25)
      .from('.terminal', { opacity: 0, y: 40, rotateX: 8, scale: 0.97, duration: 1.1, ease: 'power3.out', transformPerspective: 1000 }, 0.35);

    // Subtle parallax on the terminal and glow
    gsap.to('.terminal', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.bg-glow', { opacity: 0.4, scale: 1.3, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    // Section headings: standard scroll reveal
    gsap.utils.toArray('.section__head, .contact > *').forEach((el) => {
      gsap.from(el.children.length ? el.children : el, {
        opacity: 0, y: 24, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });

    // Grids: batched stagger so items wave in as they enter
    const batchReveal = (selector, vars) => {
      gsap.set(selector, { opacity: 0, y: 28 });
      ScrollTrigger.batch(selector, {
        start: 'top 88%',
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', overwrite: true, ...vars }),
      });
    };
    batchReveal('.bento .card, .project');
    batchReveal('.skill-group');
    batchReveal('.edu__item');

    // Chips pop in per group (back.out is fine on short tag lists)
    gsap.utils.toArray('.skill-group').forEach((g) => {
      gsap.from(g.querySelectorAll('.chips li'), {
        opacity: 0, scale: 0.85, y: 8, duration: 0.4, stagger: 0.03, ease: 'back.out(1.6)',
        scrollTrigger: { trigger: g, start: 'top 85%' },
      });
    });

    // Timeline: the line draws as you scroll, roles slide in from the left
    gsap.fromTo('.timeline__fill', { scaleY: 0 }, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
    });
    gsap.utils.toArray('.role').forEach((r) => {
      gsap.from(r, { opacity: 0, x: -24, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: r, start: 'top 82%' } });
      gsap.from(r.querySelector('.role__node'), { scale: 0, duration: 0.5, ease: 'back.out(2)', scrollTrigger: { trigger: r, start: 'top 82%' } });
    });

    // Stats: count up once
    gsap.utils.toArray('[data-count]').forEach((el) => {
      const end = Number(el.dataset.count);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: end, duration: 1.6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        onUpdate: () => { el.textContent = Math.round(obj.v); },
      });
    });
    gsap.from('.stat', { opacity: 0, y: 20, duration: 0.6, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.stats', start: 'top 90%' } });

    return () => split && split.revert();
  });

  // Magnetic buttons — only for a precise pointer with motion allowed
  mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
    const cleanups = [];
    document.querySelectorAll('.magnetic').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      const move = (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
      };
      const leave = () => { xTo(0); yTo(0); };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      cleanups.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); });
    });
    return () => cleanups.forEach((fn) => fn());
  });
})();
