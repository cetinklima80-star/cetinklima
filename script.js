let slideIndex=0;
const slides=document.querySelector('.slides'),
      images=document.querySelectorAll('.slides img'),
      totalSlides=images.length,
      dotsContainer=document.querySelector('.dots');

for(let i=0;i<totalSlides;i++){
  const dot=document.createElement('span');
  dot.classList.add('dot');
  if(i===0) dot.classList.add('active-dot');
  dot.addEventListener('click',()=>goToSlide(i));
  dotsContainer.appendChild(dot);
}

const dots=document.querySelectorAll('.dot');

function showSlide(e){
  if(e>=totalSlides) slideIndex=0;
  else if(e<0) slideIndex=totalSlides-1;
  else slideIndex=e;
  slides.style.transform=`translateX(${-slideIndex*100}%)`;
  dots.forEach(d=>d.classList.remove('active-dot'));
  dots[slideIndex].classList.add('active-dot');
}

function nextSlide(){showSlide(slideIndex+1)}
function prevSlide(){showSlide(slideIndex-1)}
function goToSlide(i){showSlide(i)}

document.querySelector('.next').addEventListener('click',nextSlide);
document.querySelector('.prev').addEventListener('click',prevSlide);
setInterval(nextSlide,5000);

// FAQ
document.querySelectorAll('.faq-question').forEach(q=>{
  q.addEventListener('click',()=>{
    const parent=q.parentElement;
    parent.classList.toggle('active');
    const ans=parent.querySelector('.faq-answer');
    ans.style.display = parent.classList.contains('active') ? 'block' : 'none';
  });
});
