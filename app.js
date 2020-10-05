// For navigation toggle
const nav = document.querySelector('.nav');
const navListMobile = document.querySelector('.nav-list-mobile');
const navMobileContainer = document.querySelector('.nav-mobile-container');
const navToggle = document.querySelector('.nav-toggle');
const navHeight = nav.getBoundingClientRect().height;

const listContainerHeight = navMobileContainer.getBoundingClientRect().height;

navToggle.addEventListener('click', () => {
  const listHeight = navListMobile.getBoundingClientRect().height;
  if (listHeight === 0) {
    navListMobile.style.height = `${listContainerHeight}px`;
  } else {
    navListMobile.style.height = 0;
  }
});
// For scrolling to the next section
const goDownBtn = document.querySelector('.go-down-btn');

goDownBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const id = this.getAttribute('href').slice(1);
  const place = document.getElementById(id);
  let coordinate = place.offsetTop - navHeight;
  window.scrollTo({
    left: 0,
    top: coordinate,
    behavior: 'smooth',
    speed: 'slow',
  });
});
// For hero changing hero opacity
const hero = document.querySelector('.hero');
const heroHeight = hero.getBoundingClientRect().height;

window.addEventListener('scroll', () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight < heroHeight) {
    let unit = 1 / heroHeight / 5;
    hero.style.opacity = 1 - unit * scrollHeight;
  }
});
// For sliding images with changing their opacity
import sliderInfos from './data.js';
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const heroTitle = document.querySelector('.banner h2');
let index = 0;

const move = (direction) => {
  if (direction === 'left') {
    index--;
    if (index < 0) index = sliderInfos.length - 1;
  } else {
    index++;
    if (index > sliderInfos.length - 1) index = 0;
  }
  hero.style.opacity = 0;
  heroTitle.style.transform = `translateY(5rem)`;
  heroTitle.style.opacity = 0;
  setTimeout(() => {
    hero.style.opacity = 1;
    hero.style.background = `linear-gradient(
      to right,
      rgba(0, 0, 0, 0.35),
      rgba(0, 0, 0, 0.35)
      ),
      url('${sliderInfos[index].url}') center/cover no-repeat fixed`;
    heroTitle.textContent = sliderInfos[index].title;
  }, 350);
  setTimeout(() => {
    heroTitle.style.opacity = 1;
    heroTitle.style.transform = `translateY(0)`;
  }, 650);
};

prevBtn.addEventListener('click', () => {
  move('left');
});
nextBtn.addEventListener('click', () => {
  move();
});
// For making projects comes from left and right
const projects = document.querySelectorAll('.project');
const firstProject = document.querySelector('.project:nth-child(1)');
const secondProject = document.querySelector('.project:nth-child(2)');
const thirdProject = document.querySelector('.project:nth-child(3)');
const fourthProject = document.querySelector('.project:nth-child(4)');

window.addEventListener('scroll', fall);
function fall() {
  const scrollHeight = window.pageYOffset;
  if (window.innerWidth > 1170) {
    projects.forEach((project) => {
      project.style.opacity = 0;
    });
    firstProject.style.transform = 'translate(-100%, -5rem)';
    secondProject.style.transform = 'translate(-100%, -5rem)';
    thirdProject.style.transform = 'translate(100%, -5rem)';
    fourthProject.style.transform = 'translate(100%, -5rem)';
    if (scrollHeight > 1300) {
      firstProject.style.animation = 'fallFromLeft 3s ease forwards';
      secondProject.style.animation = 'fallFromLeft 3s ease forwards';
      thirdProject.style.animation = 'fallFromRight 3s ease forwards';
      fourthProject.style.animation = 'fallFromRight 3s ease forwards';
    }
  }
}
// For comment slider

const comments = document.querySelectorAll('.comment');
comments.forEach((comment, index) => {
  comment.style.left = `${index * 100}%`;
});
const circleContainer = document.querySelector('.circle-container');
const circles = [...document.querySelectorAll('.circle-container span')];

circleContainer.addEventListener('click', (e) => {
  const target = e.target.closest('.circle-container span');
  const targetIndex = circles.findIndex((circle) => circle === target);
  if (target) {
    comments.forEach((comment, index) => {
      comment.style.opacity = 0;
      comment.style.transform = `translateX(-${100 * targetIndex}%)`;
      if (index === targetIndex) {
        comment.style.opacity = 1;
      }
    });
    circles.forEach((circle, index) => {
      circle.classList.remove('active');
      if (index === targetIndex) {
        circle.classList.add('active');
      }
    });
  }
});
