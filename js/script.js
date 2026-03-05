// ═══════════════════════════════════════════
// MUSTAPHA ENESI IBRAHIM — PORTFOLIO JS
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── CUSTOM CURSOR ──
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  function animateTrail() {
    const cursorRect = cursor.getBoundingClientRect();
    const cx = cursorRect.left + cursorRect.width / 2;
    const cy = cursorRect.top + cursorRect.height / 2;
    trailX += (cx - trailX) * 0.12;
    trailY += (cy - trailY) * 0.12;
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // ── PROGRESS BAR ──
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }, { passive: true });

  // ── NAV SCROLL STATE ──
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ── SCROLL REVEAL ──
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ── SMOOTH ANCHOR SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── ACTIVE NAV LINK ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === '#' + entry.target.id
            ? 'var(--paper)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // ── CRAFT CARDS STAGGER ON SCROLL ──
  const craftCards = document.querySelectorAll('.craft-card');
  const craftObserver = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      craftCards.forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 80);
      });
      craftObserver.disconnect();
    }
  }, { threshold: 0.1 });

  const craftGrid = document.querySelector('.craft-grid');
  if (craftGrid) craftObserver.observe(craftGrid);

  craftCards.forEach(card => {
    card.classList.add('reveal-up');
  });

  // ── METRIC COUNTER ANIMATION ──
  const metricNums = document.querySelectorAll('.ws-num, .meta-val');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  metricNums.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const raw = el.textContent.trim();
    const hasPlus = raw.includes('+');
    const hasPercent = raw.includes('%');
    const hasK = raw.includes('K');
    const pound = raw.startsWith('£');
    const numStr = raw.replace(/[^0-9.]/g, '');
    if (!numStr) return;

    const target = parseFloat(numStr);
    const duration = 1200;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      let display = '';
      if (pound) display = '£';
      display += target % 1 !== 0 ? current.toFixed(2) : Math.round(current);
      if (hasK) display += 'K';
      if (hasPercent) display += '%';
      if (hasPlus) display += '+';

      el.textContent = display;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ── OPENING PARALLAX ──
  const openingTitle = document.querySelector('.opening-title');
  window.addEventListener('scroll', () => {
    if (!openingTitle) return;
    const y = window.scrollY;
    if (y < window.innerHeight) {
      openingTitle.style.transform = `translateY(${y * 0.15}px)`;
      openingTitle.style.opacity = 1 - (y / (window.innerHeight * 0.8));
    }
  }, { passive: true });

});
