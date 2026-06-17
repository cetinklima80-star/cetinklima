/* ================================================================
   SCRIPT.JS — Çetin Klima
   ================================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Mobil Menü ── */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav  = document.querySelector('.mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      this.setAttribute('aria-expanded', isOpen);
      const icon = this.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    // Dışına tıklayınca kapat
    document.addEventListener('click', function (e) {
      if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });

    // ESC ile kapat
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  }

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item     = this.closest('.faq-item');
      const isOpen   = item.classList.contains('open');

      // Diğerlerini kapat
      document.querySelectorAll('.faq-item.open').forEach(function (el) {
        el.classList.remove('open');
        el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });

      // Tıklanana toggle
      if (!isOpen) {
        item.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Back to Top ── */
  const bttBtn = document.getElementById('btt');
  if (bttBtn) {
    window.addEventListener('scroll', function () {
      bttBtn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });

    bttBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── KVKK Banner ── */
  const kvkkBar = document.getElementById('kvkkBar');
  if (kvkkBar && !localStorage.getItem('kvkk_accepted')) {
    setTimeout(function () {
      kvkkBar.classList.add('show');
    }, 1200);
  }

  /* ── Active Nav Link ── */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.desktop-nav a, .mobile-nav a').forEach(function (link) {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  /* ── Footer Yılı ── */
  const yearEl = document.getElementById('copyYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Scroll Reveal (basit intersection observer) ── */
  if ('IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll(
      '.service-card, .trust-item, .step-card, .testimonial-card, .blog-card, .stat-item'
    );

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  /* ── Sayısal İstatistik Animasyonu ── */
  const statNums = document.querySelectorAll('.stat-num');
  if (statNums.length && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el       = entry.target;
          const fullText = el.textContent;
          const num      = parseFloat(fullText);
          const suffix   = fullText.replace(String(num), '');
          if (isNaN(num)) return;
          let start    = 0;
          const dur    = 1200;
          const step   = 16;
          const inc    = num / (dur / step);
          const timer  = setInterval(function () {
            start += inc;
            if (start >= num) {
              start = num;
              clearInterval(timer);
            }
            el.textContent = (Number.isInteger(num) ? Math.round(start) : start.toFixed(1)) + suffix;
          }, step);
          statsObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(function (el) { statsObserver.observe(el); });
  }

});

/* ── BTU Hesaplayıcı ── */
function calcBTU() {
  const size      = parseFloat(document.getElementById('roomSize').value);
  const ceiling   = parseFloat(document.getElementById('ceilingHeight').value);
  const sun       = parseFloat(document.getElementById('sunExposure').value);
  const occupants = parseInt(document.getElementById('occupants').value);
  const result    = document.getElementById('btuResult');
  const valEl     = document.getElementById('btuValue');
  const noteEl    = document.getElementById('btuNote');

  if (!size || size < 5) {
    valEl.textContent = 'Lütfen geçerli bir alan girin.';
    noteEl.textContent = '';
    result.classList.add('show');
    return;
  }

  // Temel hesaplama: 500 BTU/m² × tavan çarpanı × güneş × kişi eklemesi
  let btu = size * 500 * ceiling * sun;
  btu    += occupants * 600; // her ek kişi için 600 BTU

  // Osmaniye iklim düzeltmesi (+%10)
  btu    *= 1.10;

  // En yakın standart kapasiteye yuvarla
  const capacities = [7000, 9000, 12000, 18000, 24000, 36000];
  const recommended = capacities.find(c => c >= btu) || 36000;

  valEl.textContent = recommended.toLocaleString('tr-TR') + ' BTU';

  const model = recommended <= 9000 ? '9.000 BTU (~¾ HP)'
    : recommended <= 12000 ? '12.000 BTU (1 HP)'
    : recommended <= 18000 ? '18.000 BTU (1,5 HP)'
    : recommended <= 24000 ? '24.000 BTU (2 HP)'
    : '36.000 BTU (3 HP) veya üzeri';

  noteEl.textContent = `Hesaplanan ham ihtiyaç: ${Math.round(btu).toLocaleString('tr-TR')} BTU. Bunun için ${model} cihaz uygundur. Osmaniye iklim düzeltmesi dahildir.`;

  result.classList.add('show');
}

/* ── Teklif Formu ── */
function submitQuoteForm() {
  const name    = document.getElementById('qName') ? document.getElementById('qName').value.trim() : '';
  const phone   = document.getElementById('qPhone') ? document.getElementById('qPhone').value.trim() : '';
  const service = document.getElementById('qService') ? document.getElementById('qService').value : '';

  if (!name) { alert('Lütfen adınızı girin.'); return; }
  if (!phone) { alert('Lütfen telefon numaranızı girin.'); return; }

  const area  = document.getElementById('qArea') ? document.getElementById('qArea').value : '';
  const note  = document.getElementById('qNote') ? document.getElementById('qNote').value.trim() : '';

  const msg = `Merhaba, teklif almak istiyorum.%0AAdım: ${name}%0ATelefon: ${phone}%0AHizmet: ${service}%0AAlan: ${area}%0ANot: ${note}`;
  window.open(`https://wa.me/905321005054?text=${msg}`, '_blank');
}

/* ── KVKK Banner ── */
function acceptKvkk() {
  localStorage.setItem('kvkk_accepted', '1');
  const bar = document.getElementById('kvkkBar');
  if (bar) bar.classList.remove('show');
}

function dismissKvkk() {
  const bar = document.getElementById('kvkkBar');
  if (bar) bar.classList.remove('show');
}