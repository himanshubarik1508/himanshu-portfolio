AOS.init({ duration: 850, once: true, offset: 120 });

// Parallax + Segmented
(function () {
  const parallax = document.getElementById('projectsParallax') || document.getElementById('parallaxBg');
  const sections = document.querySelectorAll('.company-block');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    parallax.style.transform = `translateY(${scrolled * -0.02}px)`;
  }, { passive: true });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const speed = parseFloat(entry.target.getAttribute('data-speed') || 0.06);
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

// Mobile Menu
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Cert Zoom
document.querySelectorAll('.zoomable').forEach(img => {
  img.addEventListener('click', () => {
    img.classList.toggle('zoomed');
    document.body.style.overflow = img.classList.contains('zoomed') ? 'hidden' : '';
  });
});