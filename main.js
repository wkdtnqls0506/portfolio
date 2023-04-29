'use strict';

// 스크롤될 때 navbar 배경색 바꿈
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
})

// navbar item을 클릭했을 때 해당 페이지로 스크롤링 -> data-link를 통해 5가지 경우를 하나의 코드에 담아야 하기 때문에 데이터셋 사용
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
    const target = event.target;
    const link = target.dataset.link;  // 셀렉터 문자열 할당
    if (link === null) {
        return;
    }
    scrollIntoViews(link);
})

// "contact me" 버튼을 클릭하였을 때, contact 페이지로 스크롤링 -> contact button의 경우 한가지 경우만 존재하기 때문에 직접 #contact를 사용해도 무관
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
    scrollIntoViews('#contact');
})

function scrollIntoViews(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior : "smooth"});
}