// SLIDER
let slideIndex = 0;
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const totalSlides = images.length;
const dotsContainer = document.querySelector('.dots');

// Noktaları oluştur
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active-dot');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (index >= totalSlides) slideIndex = 0;
    if (index < 0) slideIndex = totalSlides - 1;
    slides.style.transform = `translateX(${-slideIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active-dot'));
    dots[slideIndex].classList.add('active-dot');
}

function nextSlide() { slideIndex++; showSlide(slideIndex); }
function prevSlide() { slideIndex--; showSlide(slideIndex); }
function goToSlide(n) { slideIndex = n; showSlide(slideIndex); }

document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

// Otomatik geçiş
setInterval(nextSlide, 5000); // 5 saniyede bir

// SSS akordeon (varsa)
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        const isVisible = answer.style.display === 'block';
        document.querySelectorAll('.faq-answer').forEach(a => a.style.display='none');
        answer.style.display = isVisible ? 'none' : 'block';
    });
});
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const faqItem = button.parentElement;
    faqItem.classList.toggle("active");
  });
});
