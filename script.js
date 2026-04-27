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
    <a href="index.html"     data-page="home">Home<i></i></a>
    <a href="work.html"      data-page="work">Work<i></i></a>
    <a href="writing.html"   data-page="writing">Writing<i></i></a>
    <a href="cv.html"        data-page="cv">CV<i></i></a>
    <a href="contact.html"   data-page="contact">Contact<i></i></a>
  </nav>
  <div class="nav__meta">
    <span class="nav__time" id="navTime">—</span>
    <span class="nav__dot" aria-hidden="true"></span>
    <span class="nav__loc">Urbana, IL</span>
  </div>
</header>`;
    // mark current
    $$('.nav__links a').forEach(a => {
      if (a.dataset.page === currentPage) a.classList.add('is-current');
    });
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
        <a href="work.html">Work</a>
        <a href="writing.html">Writing</a>
        <a href="cv.html">CV</a>
        <a href="contact.html">Contact</a>
      </div>
      <div>
        <span class="t-meta">Elsewhere</span>
        <a href="https://www.linkedin.com/in/robin-jephthah-rajarathinam/" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://rjrthnm2.github.io" target="_blank" rel="noopener">GitHub Pages</a>
        <a href="mailto:robinzjephthah@gmail.com">Email</a>
      </div>
      <div>
        <span class="t-meta">© <span id="year">2026</span></span>
        <span>R. J. Rajarathinam</span>
        <span>All rights reserved</span>
      </div>
    </div>
    <div class="footer__bot">
      <span>Last updated April 2026</span>
      <span>Made in Urbana, IL · 40.1106° N, 88.2073° W</span>
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

  /* ---------- CURSOR ---------- */
  const cursor = document.createElement('div');
  cursor.className = 'cursor'; cursor.setAttribute('aria-hidden','true');
  const dot = document.createElement('div');
  dot.className = 'cursor-dot'; dot.setAttribute('aria-hidden','true');
  document.body.appendChild(cursor); document.body.appendChild(dot);
  let cx = innerWidth/2, cy = innerHeight/2, tx = cx, ty = cy;
  document.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    dot.style.left = tx + 'px'; dot.style.top = ty + 'px';
  });
  (function loop(){
    cx = lerp(cx, tx, 0.18); cy = lerp(cy, ty, 0.18);
    cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px';
    requestAnimationFrame(loop);
  })();
  // delegate hover
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, [data-hover]')) cursor.classList.add('is-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, [data-hover]')) cursor.classList.remove('is-hover');
  });

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

  /* ---------- WORK RAIL ---------- */
  const rail = $('#workRail');
  const railProgress = $('#workProgress');
  if (rail) {
    let isDown = false, startX = 0, startScroll = 0;
    rail.addEventListener('mousedown', (e) => { isDown = true; rail.classList.add('is-grabbing'); startX = e.pageX; startScroll = rail.scrollLeft; });
    document.addEventListener('mouseup', () => { isDown = false; rail.classList.remove('is-grabbing'); });
    document.addEventListener('mousemove', (e) => {
      if (!isDown) return; e.preventDefault();
      rail.scrollLeft = startScroll - (e.pageX - startX) * 1.2;
    });
    rail.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const max = rail.scrollWidth - rail.clientWidth;
        const at0 = rail.scrollLeft <= 0 && e.deltaY < 0;
        const atE = rail.scrollLeft >= max - 1 && e.deltaY > 0;
        if (!at0 && !atE) { rail.scrollLeft += e.deltaY; e.preventDefault(); }
      }
    }, { passive: false });
    const updateRail = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const p = max > 0 ? rail.scrollLeft / max : 0;
      if (railProgress) railProgress.style.width = (p * 92 + 8) + '%';
    };
    rail.addEventListener('scroll', updateRail, { passive: true });
    updateRail();
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
