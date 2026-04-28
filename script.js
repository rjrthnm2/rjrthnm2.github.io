/* ========================================================
   Robin Jephthah — Multi-page portfolio
   ======================================================== */
(function () {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  /* ---------- INJECT SHARED CHROME ---------- */
  const navMount   = $('#nav-mount');
  const footMount  = $('#footer-mount');
  const isLanding  = false;
  const currentPage = document.body.dataset.page || '';

  if (navMount) {
    const isHome = currentPage === 'home';
    navMount.outerHTML = `
<header class="nav ${isHome ? '' : 'nav--light'}" id="nav">
  <a class="nav__logo" href="index.html" aria-label="Robin Jephthah — home">
    <img class="logo-dark" src="assets/logo-white.png" alt="Robin Jephthah Rajarathinam">
    <img class="logo-light" src="assets/logo-tc.png" alt="">
  </a>
  <nav class="nav__links" aria-label="Primary">
    <a href="index.html"          data-page="home">Home<i></i></a>
    <a href="publications.html"   data-page="publications">Publications<i></i></a>
    <a href="cv.html"             data-page="cv">CV<i></i></a>
    <a href="contact.html"        data-page="contact">Contact<i></i></a>
  </nav>
  <div class="nav__meta">
    <span class="nav__time" id="navTime">—</span>
    <button class="nav__toggle" type="button" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>`;
    // mark current
    $$('.nav__links a').forEach(a => {
      if (a.dataset.page === currentPage) a.classList.add('is-current');
    });
    // hamburger toggle
    const navEl_ = document.getElementById('nav');
    const toggle = navEl_?.querySelector('.nav__toggle');
    if (toggle && navEl_) {
      const closeMenu = () => {
        navEl_.classList.remove('is-menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      };
      toggle.addEventListener('click', () => {
        const open = navEl_.classList.toggle('is-menu-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.classList.toggle('no-scroll', open);
      });
      // close when a nav link is tapped
      $$('.nav__links a').forEach(a => a.addEventListener('click', closeMenu));
      // close on Escape
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
    }
  }

  if (footMount) {
    footMount.outerHTML = `
<footer class="footer">
  <div class="footer__top"></div>
  <div class="footer__inner">
    <div class="footer__sig">
      <img src="assets/logo-white.png" alt="Robin Jephthah Rajarathinam">
    </div>
    <div class="footer__cols">
      <div>
        <span class="t-meta">Site</span>
        <a href="index.html">Home</a>
        <a href="publications.html">Publications</a>
        <a href="cv.html">CV</a>
        <a href="contact.html">Contact</a>
      </div>
      <div>
        <span class="t-meta">Elsewhere</span>
        <a href="https://www.linkedin.com/in/robin-jephthah-rajarathinam/" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://scholar.google.com/citations?user=4ky-x60AAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar</a>
        <a href="mailto:robinzjephthah@gmail.com">Email</a>
      </div>
    </div>
    <div class="footer__bot">
      <span>&copy; <span id="year">2026</span> R. J. Rajarathinam</span>
      <span>All rights reserved</span>
    </div>
  </div>
</footer>`;
  }

  /* ---------- TIME ---------- */
  const setTime = () => {
    const timeEl = $('#navTime');
    if (!timeEl) return;
    try {
      const f = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', hour12: false });
      timeEl.textContent = f.format(new Date()) + ' CT';
    } catch (e) {}
  };
  setTime();
  setInterval(setTime, 30 * 1000);
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- NAV STUCK ---------- */
  const navEl = $('#nav');
  if (navEl) {
    const onScroll = () => navEl.classList.toggle('is-stuck', window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- LOADER ---------- */
  const loader = $('#loader');
  if (loader) {
    const pctEl = $('#loaderPct');
    const barEl = $('.loader__bar span');
    let pct = 0;
    const tick = () => {
      pct = Math.min(100, pct + (Math.random() * 10 + 4));
      if (pctEl) pctEl.textContent = String(Math.floor(pct)).padStart(2, '0');
      if (barEl) barEl.style.right = (100 - pct) + '%';
      if (pct < 100) setTimeout(tick, 70 + Math.random() * 60);
      else setTimeout(() => {
        loader.classList.add('is-done');
        document.documentElement.classList.add('is-loaded');
        document.body.classList.add('is-loaded');
      }, 280);
    };
    window.addEventListener('load', () => setTimeout(tick, 150));
  } else {
    // no loader on subpages — mark loaded for animations immediately
    requestAnimationFrame(() => {
      document.documentElement.classList.add('is-loaded');
      document.body.classList.add('is-loaded');
    });
  }

  /* ---------- REVEAL ---------- */
  const revealIo = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add('is-in');
      const numEl = el.querySelector('[data-count]');
      if (numEl && !numEl.dataset.done) {
        numEl.dataset.done = '1';
        const target = parseInt(numEl.dataset.count, 10) || 0;
        const dur = 1400;
        const start = performance.now();
        const animate = (t) => {
          const p = clamp((t - start) / dur, 0, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          numEl.textContent = Math.floor(eased * target);
          if (p < 1) requestAnimationFrame(animate);
          else numEl.textContent = target;
        };
        requestAnimationFrame(animate);
      }
      revealIo.unobserve(el);
    });
  }, { threshold: 0.25 });
  $$('[data-reveal-up]').forEach(el => revealIo.observe(el));

  /* ---------- TIMELINE ---------- */
  const tlIo = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); tlIo.unobserve(en.target); } });
  }, { threshold: 0.18 });
  $$('.tl__item').forEach(el => tlIo.observe(el));

  const yearSpans = $$('.tl__col--years span');
  const tlItems = $$('.tl__item');
  if (yearSpans.length && tlItems.length) {
    const onTl = () => {
      const pivot = innerHeight * 0.35;
      let active = null;
      for (const it of tlItems) {
        const r = it.getBoundingClientRect();
        if (r.top <= pivot && r.bottom >= 0) { active = it.dataset.yearBind; break; }
      }
      yearSpans.forEach(s => s.classList.toggle('is-on', s.dataset.year === active));
    };
    window.addEventListener('scroll', onTl, { passive: true });
  }

  /* ---------- PHILOSOPHY ---------- */
  const philText = $('#philText');
  if (philText) {
    const words = $$('.phil__word', philText);
    const onPhil = () => {
      const r = philText.getBoundingClientRect();
      const vh = innerHeight;
      const p = clamp((vh - r.top) / (vh * 0.85), 0, 1);
      const lit = Math.floor(p * words.length);
      words.forEach((w, i) => w.classList.toggle('is-on', i < lit));
    };
    window.addEventListener('scroll', onPhil, { passive: true });
    onPhil();
  }

  /* ---------- PUB FILTER ---------- */
  const chips = $$('.pubs__chip');
  const pubs  = $$('.pub');
  chips.forEach((c) => {
    c.addEventListener('click', () => {
      chips.forEach(x => x.classList.remove('is-active'));
      c.classList.add('is-active');
      const f = c.dataset.filter;
      pubs.forEach(p => p.classList.toggle('is-hidden', !(f === 'all' || p.dataset.cat === f)));
    });
  });

  /* ---------- LANDING CLOCK ---------- */
  const lTime = $('#landingTime');
  if (lTime) {
    const upd = () => {
      try {
        const f = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', hour12: false });
        lTime.textContent = f.format(new Date()) + ' CT';
      } catch(e){}
    };
    upd(); setInterval(upd, 30000);
  }

})();
