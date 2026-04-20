/* ═══════════════════════════════════
   NAVIGATION
═══════════════════════════════════ */
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.section;

    // Update active nav
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show target section
    sections.forEach(s => {
      s.classList.remove('active');
      if (s.id === target) s.classList.add('active');
    });

    // Re-trigger skill bar animations when Resume opens
    if (target === 'resume') animateSkillBars();
  });
});

/* ═══════════════════════════════════
   SKILL BAR ANIMATION
═══════════════════════════════════ */
function animateSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  fills.forEach(fill => {
    fill.style.animation = 'none';
    // Force reflow
    fill.offsetHeight;
    fill.style.animation = 'barGrow 1s ease forwards';
  });
}

/* ═══════════════════════════════════
   CONTACT FORM
═══════════════════════════════════ */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.submit-btn');
  const success = document.getElementById('form-success');

  btn.disabled = true;
  btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending…';

  setTimeout(() => {
    btn.innerHTML = '<i class="fa fa-paper-plane"></i> Send Message';
    btn.disabled = false;
    success.classList.add('show');
    e.target.reset();

    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1400);
}

/* ═══════════════════════════════════
   ENTRANCE ANIMATION ON LOAD
═══════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.sidebar').style.animation = 'fadeUp 0.5s ease';
  document.querySelector('.section.active').style.animation = 'fadeUp 0.5s ease 0.1s both';
});
