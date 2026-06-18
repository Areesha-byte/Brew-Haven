/* =============================================
   ABOUT.JS — Brew Haven About Page Scripts
   Links into: about.html
   ============================================= */

/* ── COUNTER ANIMATION ── */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, 16);
  });
}

/* ── INTERSECTION OBSERVER — trigger counters when stats strip is visible ── */
const statsStrip = document.querySelector('.stats-strip');
if (statsStrip) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statsStrip);
}

/* ── SCROLL REVEAL — fade cards in as user scrolls ── */
const revealElements = document.querySelectorAll(
  '.timeline-card, .mv-card, .team-card, .award-card, .gallery-item'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

/* ── NAVBAR SCROLL SHADOW ── */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.boxShadow = '0 4px 20px rgba(43,24,10,0.12)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

/* ── BACK TO TOP BUTTON VISIBILITY ── */
const topBtn = document.getElementById('topBtn');
if (topBtn) {
  topBtn.style.display = 'none';
  window.addEventListener('scroll', () => {
    topBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
    topBtn.style.alignItems = 'center';
    topBtn.style.justifyContent = 'center';
  });
}
