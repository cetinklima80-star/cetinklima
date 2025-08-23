let slideIndex=0;
const slides=document.querySelector('.slides'),
      images=document.querySelectorAll('.slides img'),
      totalSlides=images.length,
      dotsContainer=document.querySelector('.dots');

// Dots oluştur
for(let i=0;i<totalSlides;i++){
  const dot=document.createElement('span');
  dot.classList.add('dot');
  if(i===0) dot.classList.add('active-dot');
  dot.addEventListener('click',()=>goToSlide(i));
  dotsContainer.appendChild(dot);
}
const dots=document.querySelectorAll('.dot');

function showSlide(index){
  if(index>=totalSlides) slideIndex=0;
  else if(index<0) slideIndex=totalSlides-1;
  else slideIndex=index;
  slides.style.transform=`translateX(${-slideIndex*100}%)`;
  dots.forEach(dot=>dot.classList.remove('active-dot'));
  dots[slideIndex].classList.add('active-dot');
}

function nextSlide(){ slideIndex++; showSlide(slideIndex); }
function prevSlide(){ slideIndex--; showSlide(slideIndex); }
function goToSlide(n){ slideIndex=n; showSlide(slideIndex); }

document.querySelector('.next').addEventListener('click',nextSlide);
document.querySelector('.prev').addEventListener('click',prevSlide);

// Otomatik geçiş optimize edildi
let slideInterval = setInterval(nextSlide,5000);

// FAQ Akordeon
const faqItems=document.querySelectorAll('.faq-item');
faqItems.forEach(item=>{
  const question=item.querySelector('.faq-question');
  question.addEventListener('click',()=>{
    const isActive=item.classList.contains('active');
    faqItems.forEach(i=>i.classList.remove('active'));
    if(!isActive) item.classList.add('active');
  });
});
