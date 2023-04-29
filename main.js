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
});

// navbar item을 클릭했을 때 해당 페이지로 스크롤링 -> data-link를 통해 5가지 경우를 하나의 코드에 담아야 하기 때문에 데이터셋 사용
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
    const target = event.target;
    const link = target.dataset.link;  // 셀렉터 문자열 할당
    if (link === null) {
        return;
    }
    scrollIntoViews(link);
});

// "contact me" 버튼을 클릭하였을 때, contact 페이지로 스크롤링 -> contact button의 경우 한가지 경우만 존재하기 때문에 직접 #contact를 사용해도 무관
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
    scrollIntoViews('#contact');
});

// scroll이 내려갈수록 home 페이지가 점점 투명해지도록 설정
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});

// 스크롤하여 내려올 때 arrow up button이 생성되어 버튼 클릭시 맨 위로 올라가도록 설정
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
    if (window.scrollY > homeHeight / 2) {
        arrowUp.classList.add("visible");
    } else {
        arrowUp.classList.remove("visible");
    }
})

arrowUp.addEventListener("click", () => {
    scrollIntoViews('#home');
})



















function scrollIntoViews(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior : "smooth"});
}