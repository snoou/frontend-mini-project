const slide = document.querySelectorAll(".slide-1");
const nextBtn = document.querySelector(".swiper-button-next");
const prevBtn = document.querySelector(".swiper-button-prev");

let count = 0;

function showSlide(index) {
  slide.forEach((element) => {
    element.classList.remove("active");
  });
  slide[index].classList.add("active");
}

nextBtn.addEventListener('click', function(){
  count = (count + 1) % slide.length;
  showSlide(count)
})

prevBtn.addEventListener('click' , function(){
 count =  (count - 1 + slide.length) % slide.length;
 showSlide(count)
})
