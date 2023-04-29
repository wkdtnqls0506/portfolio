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

// navbar item을 클릭했을 때 해당 페이지로 스크롤링
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
    const target = event.target;
    const link = target.dataset.link;  // 셀렉터 문자열 할당
    if (link === null) {
        return;
    }
    const scrollTo = document.querySelector(link);  // 문자열에는 scrollIntoView라는 함수가 존재하지 않으므로 querySelector를 사용하여 DOM 요소를 받아옴 
    scrollTo.scrollIntoView({behavior : "smooth"});
})