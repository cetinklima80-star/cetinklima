let slideIndex = 0;

// --- SLIDER: sadece varsa çalıştır ---
const sliderEl = document.querySelector('.slider');
if (sliderEl) {
  const slides = sliderEl.querySelector('.slides');
  const images = sliderEl.querySelectorAll('.slides img');
  const totalSlides = images.length;
  const dotsContainer = sliderEl.parentElement.querySelector('.dots');

  if (slides && totalSlides > 0 && dotsContainer) {
    // Dots oluştur
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.setAttribute('role', 'button');
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('aria-label', `Slayt ${i + 1}`);
      if (i === 0) dot.classList.add('active-dot');
      dot.addEventListener('click', () => goToSlide(i));
      dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') goToSlide(i);
      });
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('.dot');

    function showSlide(n) {
      if (n >= totalSlides) slideIndex = 0;
      else if (n < 0) slideIndex = totalSlides - 1;
      else slideIndex = n;

      slides.style.transform = `translateX(${-slideIndex * 100}%)`;
      dots.forEach(d => d.classList.remove('active-dot'));
      dots[slideIndex].classList.add('active-dot');
    }

    function nextSlide() { slideIndex++; showSlide(slideIndex); }
    function prevSlide() { slideIndex--; showSlide(slideIndex); }
    function goToSlide(n) { slideIndex = n; showSlide(slideIndex); }

    const nextBtn = sliderEl.querySelector('.next');
    const prevBtn = sliderEl.querySelector('.prev');
    if (nextBtn) {
      nextBtn.setAttribute('aria-label', 'Sonraki slayt');
      nextBtn.addEventListener('click', nextSlide);
    }
    if (prevBtn) {
      prevBtn.setAttribute('aria-label', 'Önceki slayt');
      prevBtn.addEventListener('click', prevSlide);
    }

    // Otomatik geçiş
    setInterval(nextSlide, 5000);
  }
}

// --- FAQ (ortak): varsa çalışır ---
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
