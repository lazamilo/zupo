(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  if (reduce) root.classList.add('reduce');
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---- smooth scroll ---- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    if (window.gsap) {
      lenis.on('scroll', () => window.ScrollTrigger && ScrollTrigger.update());
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  /* ---- nav ---- */
  const nav = $('.nav');
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    const megaOpen = $('.mega.open');
    nav.classList.toggle('hide', y > 500 && y > lastY && !megaOpen && !document.body.classList.contains('mopen'));
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* mega menu */
  const megaBtn = $('[data-mega]');
  const mega = $('.mega');
  const scrim = $('.scrim');
  const setMega = open => {
    if (!mega) return;
    mega.classList.toggle('open', open);
    scrim.classList.toggle('on', open);
    megaBtn.setAttribute('aria-expanded', open);
    $$('.mega-list a').forEach((a, i) => a.style.transitionDelay = open ? (0.12 + i * 0.04) + 's' : '0s');
  };
  if (megaBtn) {
    megaBtn.addEventListener('click', () => setMega(!mega.classList.contains('open')));
    scrim.addEventListener('click', () => setMega(false));
    addEventListener('keydown', e => e.key === 'Escape' && setMega(false));
    const pics = $$('.mega-pic img'), cap = $('.mega-pic p');
    $$('.mega-list a').forEach((a, i) => a.addEventListener('mouseenter', () => {
      pics.forEach((p, j) => p.classList.toggle('on', j === i));
      cap.textContent = a.dataset.cap || '';
    }));
  }
  const burger = $('.burger');
  burger && burger.addEventListener('click', () => {
    document.body.classList.toggle('mopen');
    burger.setAttribute('aria-expanded', document.body.classList.contains('mopen'));
    lenis && (document.body.classList.contains('mopen') ? lenis.stop() : lenis.start());
  });

  /* ---- clock (Ljubljana) ---- */
  const clock = $('[data-clock]');
  if (clock) {
    const tick = () => clock.textContent = new Intl.DateTimeFormat('sl-SI', { timeZone: 'Europe/Ljubljana', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date());
    tick(); setInterval(tick, 1000);
  }

  /* ---- uptime bars ---- */
  const bars = $('.bars');
  if (bars) {
    for (let i = 0; i < 48; i++) {
      const el = document.createElement('i');
      const h = 60 + Math.round(Math.random() * 40);
      el.style.height = h + '%';
      if (i === 17 || i === 36) el.className = 'w';
      bars.appendChild(el);
    }
  }

  /* ---- live counters in status ---- */
  const ping = $('[data-ping]');
  if (ping) setInterval(() => ping.textContent = (8 + Math.random() * 6).toFixed(1) + ' ms', 1600);

  /* ---- form ---- */
  const form = $('form.form');
  form && form.addEventListener('submit', e => { e.preventDefault(); form.classList.add('done'); form.reset(); });

  /* ---- services cursor preview ---- */
  const cp = $('.cursor-pic');
  if (cp && matchMedia('(hover:hover)').matches) {
    const imgs = $$('img', cp);
    let x = 0, y = 0, cx = 0, cy = 0;
    addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; });
    const loop = () => { cx += (x - cx) * 0.14; cy += (y - cy) * 0.14; cp.style.left = cx + 'px'; cp.style.top = cy + 'px'; requestAnimationFrame(loop); };
    loop();
    $$('.svc').forEach((s, i) => {
      s.addEventListener('mouseenter', () => { cp.classList.add('on'); imgs.forEach((im, j) => im.classList.toggle('on', j === i)); });
      s.addEventListener('mouseleave', () => cp.classList.remove('on'));
    });
  }

  /* ---- marquee duplicate ---- */
  $$('.marq').forEach(m => m.innerHTML += m.innerHTML);

  if (!window.gsap || reduce) {
    $$('.rv').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
    $$('.intro-text .w').forEach(w => w.classList.add('on'));
    $$('.layer').forEach(l => l.classList.add('on'));
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* hero headline */
  const lines = $$('.hero h1 .ln > span');
  if (lines.length) {
    gsap.from(lines, { yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: 0.09, delay: 0.15 });
    gsap.from('.hero-row > *', { y: 30, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1, delay: 0.55 });
  }
  /* hero frame: grows to full bleed */
  const hm = $('.hero-media');
  if (hm) {
    gsap.from('.hero-frame', { y: 80, opacity: 0, duration: 1.4, ease: 'expo.out', delay: 0.5 });
    gsap.to(hm, { paddingLeft: 0, paddingRight: 0, ease: 'none', scrollTrigger: { trigger: hm, start: 'top 85%', end: 'top 10%', scrub: true } });
    gsap.to('.hero-frame', { borderRadius: 0, ease: 'none', scrollTrigger: { trigger: hm, start: 'top 60%', end: 'top 10%', scrub: true } });
    gsap.from('.status, .slogan', { y: 30, opacity: 0, duration: 1, ease: 'expo.out', stagger: .12, delay: 1.1 });
  }

  /* generic reveals */
  $$('.rv').forEach(el => gsap.to(el, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));
  ScrollTrigger.batch('.rvs', { start: 'top 90%', onEnter: b => gsap.fromTo(b, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.08 }) });
  gsap.set('.rvs', { opacity: 0 });

  /* parallax inside frames */
  $$('[data-par] img, [data-par] video').forEach(im => {
    gsap.fromTo(im, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: im.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* intro words light up */
  const words = $$('.intro-text .w');
  if (words.length) {
    ScrollTrigger.create({
      trigger: '.intro-text', start: 'top 75%', end: 'bottom 45%', scrub: true,
      onUpdate: s => { const n = Math.round(s.progress * words.length); words.forEach((w, i) => w.classList.toggle('on', i < n)); }
    });
  }

  /* counters */
  $$('[data-count]').forEach(el => {
    const end = +el.dataset.count, o = { v: 0 };
    ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => gsap.to(o, { v: end, duration: 2, ease: 'expo.out', onUpdate: () => el.firstChild.nodeValue = Math.round(o.v).toLocaleString('sl-SI') }) });
  });

  /* data centre layers */
  const layers = $$('.layer'), plates = $$('.layers-vis .pl');
  const isDesk = matchMedia('(min-width:1101px)').matches;
  if (layers.length) {
    const setL = i => {
      layers.forEach((l, j) => l.classList.toggle('on', j === i));
      plates.forEach(p => {
        const j = +p.dataset.i;
        p.classList.toggle('on', j === i);
        p.style.transform = j === i ? 'translateY(-34px)' : (j < i ? 'translateY(-10px)' : 'translateY(0)');
      });
    };
    if (isDesk) layers.forEach((l, i) => ScrollTrigger.create({ trigger: l, start: 'top 55%', end: 'bottom 55%', onToggle: s => s.isActive && setL(i) }));
    else { layers.forEach(l => l.classList.add('on')); }
    setL(0);
  }

  /* spark line draw */
  $$('.spark path.ln').forEach(p => {
    const len = p.getTotalLength();
    gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 2.4, ease: 'power2.out', scrollTrigger: { trigger: p, start: 'top 85%' } });
  });

  /* timeline horizontal scroll */
  const track = $('.tl-track');
  if (track) {
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '.tl', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.6, invalidateOnRefresh: true } });
  }

  /* urgenca huge type slide */
  const huge = $('.urg .huge');
  huge && gsap.fromTo(huge, { xPercent: 0 }, { xPercent: -12, ease: 'none', scrollTrigger: { trigger: '.urg', start: 'top bottom', end: 'bottom top', scrub: true } });
  const fb = $('.foot-big');
  fb && gsap.from(fb, { yPercent: 40, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: fb, start: 'top 95%' } });

  /* page hero */
  const ph = $('.page-hero h1');
  if (ph) gsap.from('.page-hero > *', { y: 50, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08, delay: 0.1 });

  addEventListener('load', () => ScrollTrigger.refresh());
})();
