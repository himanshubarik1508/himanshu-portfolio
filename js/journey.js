// Initialize AOS
AOS.init({
  duration: 850,
  once: true,
  offset: 120
});

/*
 Parallax segmented effect:
 - Move background at different speed multipliers per section using data-speed attribute
 - Also apply a global subtle transform based on scroll
*/
(function () {
  const parallax = document.getElementById('projectsParallax');
  const sections = document.querySelectorAll('.company-block');

  // global small move
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    // subtle global translate for depth
    parallax.style.transform = `translateY(${scrolled * -0.02}px)`;
  }, { passive: true });

  // segmented deeper parallax (subtle): as each section enters view, nudge the bg a bit
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const speed = parseFloat(entry.target.getAttribute('data-speed') || 0.06);
        // animate with requestAnimationFrame for smoothness
        let start = null;
        const duration = 600;
        const initial = parseFloat(parallax.style.transform.replace(/[^\d-.,]/g, '')) || 0;
        const target = (window.scrollY * -speed);

        function step(ts) {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const value = initial + (target - initial) * progress;
          parallax.style.transform = `translateY(${value}px)`;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(s => io.observe(s));
})();

// close modal helper (if you add modals later)
function closeModalOnBg(e, id) {
  if (e.target.classList.contains('modal')) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('show');
  }
}
// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}
