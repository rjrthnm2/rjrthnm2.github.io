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
    <button class="theme-toggle" type="button" role="switch" aria-checked="false" aria-label="Switch to night mode">
      <span class="theme-toggle__track">
        <span class="theme-toggle__thumb">
          <svg class="theme-toggle__icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4.2"/>
            <line x1="12" y1="2.5" x2="12" y2="4.5"/>
            <line x1="12" y1="19.5" x2="12" y2="21.5"/>
            <line x1="4.6" y1="4.6" x2="6.1" y2="6.1"/>
            <line x1="17.9" y1="17.9" x2="19.4" y2="19.4"/>
            <line x1="2.5" y1="12" x2="4.5" y2="12"/>
            <line x1="19.5" y1="12" x2="21.5" y2="12"/>
            <line x1="4.6" y1="19.4" x2="6.1" y2="17.9"/>
            <line x1="17.9" y1="6.1" x2="19.4" y2="4.6"/>
          </svg>
          <svg class="theme-toggle__icon-moon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
          </svg>
        </span>
      </span>
    </button>
    <button class="nav__toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>`;
    // mark current
    $$('.nav__links a').forEach(a => {
      if (a.dataset.page === currentPage) {
        a.classList.add('is-current');
        a.setAttribute('aria-current', 'page');
      }
    });
    // hamburger toggle
    const navEl_ = document.getElementById('nav');
    const toggle = navEl_?.querySelector('.nav__toggle');
    if (toggle && navEl_) {
      // While the menu is open, take the rest of the page out of focus +
      // a11y trees so screen readers and Tab stay inside the drawer.
      const setInert = (open) => {
        document.querySelectorAll('main, #footer-mount, footer').forEach((el) => {
          if (open) {
            el.setAttribute('inert', '');
            el.setAttribute('aria-hidden', 'true');
          } else {
            el.removeAttribute('inert');
            el.removeAttribute('aria-hidden');
          }
        });
      };
      const setOpen = (open) => {
        navEl_.classList.toggle('is-menu-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.classList.toggle('no-scroll', open);
        setInert(open);
      };
      const closeMenu = () => setOpen(false);
      toggle.addEventListener('click', () => setOpen(!navEl_.classList.contains('is-menu-open')));
      // close when a nav link is tapped
      $$('.nav__links a').forEach(a => a.addEventListener('click', closeMenu));
      // close on Escape
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
    }
    // theme toggle
    const themeToggle = navEl_?.querySelector('.theme-toggle');
    if (themeToggle) {
      const syncTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        try { localStorage.setItem('theme', theme); } catch (e) {}
        const isNight = theme === 'night';
        themeToggle.setAttribute('aria-checked', isNight ? 'true' : 'false');
        themeToggle.setAttribute('aria-label', isNight ? 'Switch to day mode' : 'Switch to night mode');
      };
      // sync ARIA from whatever the inline init script applied
      syncTheme(document.documentElement.getAttribute('data-theme') || 'day');
      themeToggle.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'night' ? 'day' : 'night';
        syncTheme(next);
      });
    }
  }

  if (footMount) {
    footMount.outerHTML = `
<footer class="footer">
  <div class="footer__top"></div>
  <div class="footer__inner">
    <div class="footer__cols">
      <div class="footer__col footer__col--lead">
        <div class="footer__sig">
          <img src="assets/logo-white.png" alt="Robin Jephthah Rajarathinam">
        </div>
        <p class="footer__tag">Researcher &middot; Designer &middot; Educator</p>
      </div>
      <div class="footer__col footer__col--site">
        <span class="t-meta">Site</span>
        <a href="index.html">Home</a>
        <a href="publications.html">Publications</a>
        <a href="cv.html">CV</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="footer__col footer__col--connect">
        <span class="t-meta">Connect</span>
        <ul class="footer__icons">
          <li><a class="footer__icon" href="https://www.linkedin.com/in/robin-jephthah-rajarathinam/" target="_blank" rel="noopener" aria-label="LinkedIn — Robin Jephthah Rajarathinam">
            <span class="footer__icon-glyph" data-icon="linkedin" aria-hidden="true"></span>
            <span class="footer__icon-label">LinkedIn</span>
          </a></li>
          <li><a class="footer__icon" href="https://scholar.google.com/citations?user=4ky-x60AAAAJ&amp;hl=en" target="_blank" rel="noopener" aria-label="Google Scholar — Robin Jephthah Rajarathinam">
            <span class="footer__icon-glyph" data-icon="scholar" aria-hidden="true"></span>
            <span class="footer__icon-label">Scholar</span>
          </a></li>
          <li><a class="footer__icon" href="https://github.com/rjrthnm2" target="_blank" rel="noopener" aria-label="GitHub — rjrthnm2">
            <span class="footer__icon-glyph" data-icon="github" aria-hidden="true"></span>
            <span class="footer__icon-label">GitHub</span>
          </a></li>
          <li><a class="footer__icon" href="mailto:robinzjephthah@gmail.com" aria-label="Email Robin Jephthah Rajarathinam">
            <span class="footer__icon-glyph" data-icon="email" aria-hidden="true"></span>
            <span class="footer__icon-label">Email</span>
          </a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bot">
      <span>&copy; <span id="year">2026</span> Robin Jephthah Rajarathinam</span>
      <span class="footer__legal">
        <a href="privacy.html">Privacy</a>
        <span aria-hidden="true">&middot;</span>
        <a href="accessibility.html">Accessibility</a>
      </span>
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
  // Tag reveal targets at runtime (not in the HTML) so content is never
  // stuck hidden when JS is unavailable.
  const REVEAL_TARGETS = [
    '.intro__copy p',
    '.intro__side',
    '.home-nav__head',
    '.home-nav__card',
    '.pubs__head',
    '.pub',
    '.cv__section-h',
    '.exp',
    '.cv-cta'
  ];
  const revealTagged = [];
  REVEAL_TARGETS.forEach((sel) => {
    $$(sel).forEach((el, i) => {
      // transition:none while tagging so elements snap (not fade) to their
      // hidden state if a paint already happened before this script ran.
      el.style.transition = 'none';
      el.setAttribute('data-reveal-up', '');
      revealTagged.push([el, sel === '.home-nav__card' ? i * 90 : 0]);
    });
  });

  const revealIo = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add('is-in');
      // Once revealed, drop the attribute so the element's own hover
      // transitions (.pub padding, card colors) take back over.
      setTimeout(() => {
        el.removeAttribute('data-reveal-up');
        el.classList.remove('is-in');
        el.style.transitionDelay = '';
      }, 1100);
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
  // Re-enable transitions (and apply the nav-card stagger) one frame after
  // the hidden state has painted, then start observing. setTimeout fallback
  // covers contexts where rAF is throttled.
  let revealArmed = false;
  const armReveal = () => {
    if (revealArmed) return;
    revealArmed = true;
    revealTagged.forEach(([el, delay]) => {
      el.style.transition = '';
      if (delay) el.style.transitionDelay = delay + 'ms';
      revealIo.observe(el);
    });
  };
  requestAnimationFrame(() => requestAnimationFrame(armReveal));
  setTimeout(armReveal, 400);

  /* ---------- CV YEAR RAILS (per-section) ---------- */
  $$('.cv__layout').forEach((layout) => {
    const railBtns = $$('.year-rail [data-year]', layout);
    const exps = $$('.exp[data-years]', layout);
    if (!railBtns.length || !exps.length) return;

    let arrivalTimer = null;
    // Click → scroll to first matching exp within THIS section + arrival flash
    railBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const y = btn.dataset.year;
        const target = exps.find((e) => (e.dataset.years || '').split(/\s+/).includes(y));
        if (!target) return;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        exps.forEach((e) => e.classList.remove('is-just-arrived'));
        clearTimeout(arrivalTimer);
        requestAnimationFrame(() => target.classList.add('is-just-arrived'));
        arrivalTimer = setTimeout(() => target.classList.remove('is-just-arrived'), 1200);
      });
    });

    // Scroll → highlight all years the in-view exp spans (within this section).
    const onCv = () => {
      const pivot = innerHeight * 0.30;
      let active = null;
      for (const e of exps) {
        if (e.getBoundingClientRect().top <= pivot) active = e;
        else break;
      }
      if (!active) active = exps[0];
      const activeYears = new Set((active.dataset.years || '').split(/\s+/));
      railBtns.forEach((b) => {
        const on = activeYears.has(b.dataset.year);
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    };
    window.addEventListener('scroll', onCv, { passive: true });
    onCv();
  });

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

  /* ---------- CV CHIP-BAR HEIGHT (drives section scroll offset) ----------
     The chip bar wraps to 1, 2, or 3 rows depending on viewport width.
     We measure it live and publish (sticky-top + offsetHeight + breathing)
     as a CSS variable, so scroll-margin-top on each #section stays correct
     for both URL-hash navigation and the smooth-scroll handler below. */
  const cvChipBar = document.querySelector('.cv-chips');
  if (cvChipBar) {
    const syncChipOffset = () => {
      const cs = getComputedStyle(cvChipBar);
      const stickyTop = parseFloat(cs.top) || 0;
      const barHeight = cvChipBar.offsetHeight;
      const breathing = 14;
      document.documentElement.style.setProperty(
        '--cv-section-offset',
        (stickyTop + barHeight + breathing) + 'px'
      );
    };
    syncChipOffset();
    window.addEventListener('resize', syncChipOffset, { passive: true });
    if ('ResizeObserver' in window) {
      new ResizeObserver(syncChipOffset).observe(cvChipBar);
    }
  }

  /* ---------- CV SECTION CHIPS (scroll-spy) ---------- */
  const cvChips = $$('.cv-chips__chip');
  if (cvChips.length) {
    const chipMap = new Map();
    cvChips.forEach((c) => {
      const id = c.dataset.target;
      const sec = document.getElementById(id);
      if (sec) chipMap.set(sec, c);
    });
    if (chipMap.size) {
      const setActive = (target) => {
        cvChips.forEach((c) => {
          const on = c.dataset.target === target;
          c.classList.toggle('is-active', on);
          if (on) c.setAttribute('aria-current', 'true');
          else c.removeAttribute('aria-current');
        });
      };
      const sections = [...chipMap.keys()];
      const cvIo = new IntersectionObserver((entries) => {
        // Pick the entry whose section is most visible near the top of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) {
          const winner = visible[0].target;
          setActive(chipMap.get(winner).dataset.target);
        }
      }, { rootMargin: '-110px 0px -65% 0px', threshold: 0 });
      sections.forEach((s) => cvIo.observe(s));

      // Smooth-scroll on chip click without jumping past the sticky offset.
      cvChips.forEach((c) => {
        c.addEventListener('click', (e) => {
          const id = c.dataset.target;
          const sec = document.getElementById(id);
          if (!sec) return;
          e.preventDefault();
          history.replaceState(null, '', '#' + id);
          sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActive(id);
        });
      });
    }
  }

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
