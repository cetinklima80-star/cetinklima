let slideIndex=0;
const slides=document.querySelector('.slides'),
      images=document.querySelectorAll('.slides img'),
      totalSlides=images.length,
      dotsContainer=document.querySelector('.dots');

for(let i=0;i<totalSlides;i++){
    const dot=document.createElement('span');
    dot.classList.add('dot');
    dot.setAttribute("role","button");
    dot.setAttribute("tabindex","0");
    dot.setAttribute("aria-label",`Slayt ${i+1}`);
    if(i===0) dot.classList.add('active-dot');
    dot.addEventListener('click',()=>goToSlide(i));
    dot.addEventListener('keydown',(e)=>{ if(e.key==="Enter"||e.key===" "){ goToSlide(i); } });
    dotsContainer.appendChild(dot);
}

const dots=document.querySelectorAll('.dot');

function showSlide(e){
    if(e>=totalSlides) slideIndex=0;
    else if(e<0) slideIndex=totalSlides-1;
    else slideIndex=e;
    
    slides.style.transform=`translateX(${-slideIndex*100}%)`;
    dots.forEach(e=>e.classList.remove('active-dot'));
    dots[slideIndex].classList.add('active-dot');
}

function nextSlide(){ slideIndex++; showSlide(slideIndex); }
function prevSlide(){ slideIndex--; showSlide(slideIndex); }
function goToSlide(e){ slideIndex=e; showSlide(slideIndex); }

document.querySelector('.next').setAttribute("aria-label","Sonraki slayt");
document.querySelector('.prev').setAttribute("aria-label","Önceki slayt");

document.querySelector('.next').addEventListener('click',nextSlide);
document.querySelector('.prev').addEventListener('click',prevSlide);
setInterval(nextSlide,5000);

// FAQ toggle
const faqItems=document.querySelectorAll('.faq-item');
faqItems.forEach(e=>{
    e.querySelector('.faq-question').addEventListener('click',()=>{
        const t=e.querySelector('.faq-answer'),
              n=t.style.display==="block";
        document.querySelectorAll('.faq-answer').forEach(e=>e.style.display="none");
        t.style.display=n?"none":"block";
    });
});

document.querySelectorAll(".faq-question").forEach(e=>{
    e.addEventListener("click",()=>{
        const t=e.parentElement;
        t.classList.toggle("active");
    });
});

// Mobil menü toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
