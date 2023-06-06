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
    navbarMenu.classList.remove('open');
    scrollIntoViews(link);
    selectNavItem(target);
});

// 반응형 : 토글 버튼 클릭시 navbar가 보이도록 설정
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
})

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

// project 카테고리를 클릭하였을 때 해당 이미지만 띄우도록 필터링
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');  // [object NodeList]
workBtnContainer.addEventListener('click', (e) => {
    // <span> 태그로 감싸져 있는 것을 data-filter가 선언되어 있지 않으므로 부모노드를 찾아 반환
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }

    // project category 선택시 active 되도록 설정
    const active = document.querySelector(".category__btn.selected");
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    console.log(e.target);
    
    target.classList.add('selected');

    setTimeout(() => {
        projectContainer.classList.remove('anim-out');
    }, 300);
    projectContainer.classList.add('anim-out');
    projects.forEach((project) => {
        console.log(project.dataset.type);
        if (filter === '*' || filter === project.dataset.type) {
            project.classList.remove('invisible');
        } else {
            project.classList.add('invisible');
        }
    });
});

// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다

const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => 
    document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

function scrollIntoViews(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior : "smooth"});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
    root : null,
    rootMargin: '0px',
    threshold : 0.3,
};

const observerCallback = (entries, observer) => {  // 해당하는 섹션을 찾아서 navbar 메뉴를 활성화
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0) {  // 나가는 경우
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            if(entry.boundingClientRect.y < 0) {  // 스크롤링이 아래로 내려가 페이지가 올라옴
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex = index - 1;
            }
        }
    })
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));  // 관찰

window.addEventListener('wheel', () => {
    if (window.scrollY === 0) {  // 화면이 맨 위로 스크롤 되었을 때
        selectedNavIndex = 0;
    } else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {  // 화면이 맨 아래로 스크롤 되었을 때
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});