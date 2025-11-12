// script.js - geliştirilmiş slider + FAQ + mobil menü

// --- Mobil Menü (aynı) ---
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("show");
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// --- FAQ ---
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-question');
  const ans = item.querySelector('.faq-answer');
  if (!btn || !ans) return;

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    // diğerlerini kapat
    document.querySelectorAll('.faq-item .faq-question').forEach(b=>{
      b.setAttribute('aria-expanded','false');
    });
    document.querySelectorAll('.faq-item .faq-answer').forEach(a=>{
      a.hidden = true;
    });

    btn.setAttribute('aria-expanded', String(!expanded));
    ans.hidden = expanded;
    item.classList.toggle('active', !expanded);
  });
});

// --- Gelişmiş Slider ---
(function initSlider(){
  const sliderEl = document.querySelector('.slider');
  if (!sliderEl) return;

  const slidesWrap = sliderEl.querySelector('.slides');
  const slideEls = Array.from(sliderEl.querySelectorAll('.slide'));
  const dotsContainer = document.querySelector('.dots');
  const prevBtn = sliderEl.querySelector('[data-dir="prev"]');
  const nextBtn = sliderEl.querySelector('[data-dir="next"]');
  const progressBar = sliderEl.querySelector('.slider-progress-bar');

  let index = 0;
  const total = slideEls.length;
  if (total === 0) return;

  // Accessibility
  sliderEl.setAttribute('tabindex', '0');

  // Create dots
  const dots = [];
  slideEls.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('aria-label', `Slayt ${i+1}`);
    dot.setAttribute('role', 'tab');
    dot.addEventListener('click', ()=> goTo(i));
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  function updateUI(){
    // transform
    slidesWrap.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach(d=>d.classList.remove('active-dot'));
    if (dots[index]) dots[index].classList.add('active-dot');
  }

  // autoplay management
  const autoplay = sliderEl.dataset.autoplay === 'true';
  const intervalMs = parseInt(sliderEl.dataset.interval || '4500', 10);
  let timer = null;
  let progressStart = null;

  function startAutoplay(){
    if (!autoplay) return;
    stopAutoplay();
    progressStart = performance.now();
    timer = setInterval(()=> {
      next();
      // reset progressStart for smooth progress bar
      progressStart = performance.now();
    }, intervalMs);
    animateProgress();
  }

  function stopAutoplay(){
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    cancelAnimationFrame(progressRAF);
  }

  // progress bar animation
  let progressRAF = null;
  function animateProgress(now){
    if (!autoplay || !progressBar) return;
    const elapsed = performance.now() - (progressStart || performance.now());
    const pct = Math.min(1, elapsed / intervalMs);
    progressBar.style.width = `${pct * 100}%`;
    progressRAF = requestAnimationFrame(animateProgress);
  }

  function resetProgress(){
    if (progressBar) progressBar.style.width = '0%';
    progressStart = performance.now();
  }

  function next(){ index = (index + 1) % total; updateUI(); resetProgress(); }
  function prev(){ index = (index - 1 + total) % total; updateUI(); resetProgress(); }
  function goTo(i){ index = (i + total) % total; updateUI(); resetProgress(); }

  // buttons
  if (nextBtn) nextBtn.addEventListener('click', ()=> { next(); restartAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', ()=> { prev(); restartAutoplay(); });

  // keyboard navigation
  sliderEl.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { prev(); restartAutoplay(); }
    if (e.key === 'ArrowRight') { next(); restartAutoplay(); }
  });

  // pause on hover / focus
  sliderEl.addEventListener('mouseenter', ()=> stopAutoplay());
  sliderEl.addEventListener('mouseleave', ()=> startAutoplay());
  sliderEl.addEventListener('focusin', ()=> stopAutoplay());
  sliderEl.addEventListener('focusout', ()=> startAutoplay());

  // touch / swipe support
  let touchStartX = 0, touchDeltaX = 0, isTouching = false;
  slidesWrap.addEventListener('touchstart', (e)=>{
    stopAutoplay();
    isTouching = true;
    touchStartX = e.touches[0].clientX;
  }, {passive:true});
  slidesWrap.addEventListener('touchmove', (e)=>{
    if (!isTouching) return;
    touchDeltaX = e.touches[0].clientX - touchStartX;
  }, {passive:true});
  slidesWrap.addEventListener('touchend', ()=>{
    isTouching = false;
    if (Math.abs(touchDeltaX) > 50) {
      if (touchDeltaX < 0) next();
      else prev();
    }
    touchDeltaX = 0;
    restartAutoplay();
  });

  // resize observer to maintain height (if needed)
  const ro = new ResizeObserver(()=> {
    // we keep aspect ratio via CSS; if you want dynamic heights you can update here
  });
  slideEls.forEach(s => ro.observe(s));

  function restartAutoplay(){
    stopAutoplay();
    setTimeout(()=> startAutoplay(), 650);
  }

  // initialize
  updateUI();
  startAutoplay();

  // Expose for debugging (optional)
  window.__cetinklima_slider = { goTo, next, prev, startAutoplay, stopAutoplay };
})();
