/* =============================================
   NAV.JS — Shared mobile navbar toggle
   Include this on EVERY page, after style.css
   loads but before page-specific JS (or anywhere,
   since it only needs the DOM to be ready).
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const navLinks = navbar.querySelector('.nav-links');
  if (!navLinks) return;

  // Create hamburger button if it doesn't already exist in the HTML
  let toggle = navbar.querySelector('.nav-toggle');
  if (!toggle) {
    toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Toggle navigation menu');
    toggle.innerHTML = '<span></span><span></span><span></span>';
    // Insert before the cart/order button if present, else append
    const cartOrBtn = navbar.querySelector('.cart-btn, .btn');
    if (cartOrBtn) {
      navbar.insertBefore(toggle, cartOrBtn);
    } else {
      navbar.appendChild(toggle);
    }
  }

  toggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
});