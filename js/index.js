// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 900,
  once: true,
  offset: 120
});

// Parallax & fade activation: show parallax background after hero section
(function () {
  const parallaxBg = document.getElementById('parallaxBg');
  const parallaxOverlay = document.getElementById('parallaxOverlay');
  const hero = document.getElementById('hero');

  // Only run parallax logic if hero and parallax elements exist
  if (hero && parallaxBg && parallaxOverlay) {
    function onScroll() {
      const heroBottom = hero.getBoundingClientRect().bottom;
      const viewportH = window.innerHeight;

      // when hero bottom is above 20px from top of viewport, activate parallax
      if (heroBottom <= viewportH * 0.85) {
        parallaxBg.classList.add('active');
        parallaxOverlay.classList.add('active');
      } else {
        parallaxBg.classList.remove('active');
        parallaxOverlay.classList.remove('active');
      }

      // subtle parallax movement
      const scrolled = window.scrollY;
      // slower movement (negative) to get upward parallax
      parallaxBg.style.transform = `translateY(${scrolled * -0.06}px)`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', onScroll);
  }
})();

// Modal handlers for certificate images
function openModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.add('show');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.remove('show');
}
function closeModalOnBg(e, id) {
  if (e.target.classList.contains('modal')) closeModal(id);
}
window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.show').forEach(m => m.classList.remove('show'));
  }
});

// Lazy load images (simple)
document.addEventListener('DOMContentLoaded', function () {
  const imgs = document.querySelectorAll('img');
  imgs.forEach(img => {
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
  });
});

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}
