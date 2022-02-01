// ***** menu *****
const navButton = document.querySelector('.nav-button');
const navMenu = document.querySelector('.nav-menu');
const navLink = document.querySelectorAll('.nav-link');

const openMenu = () => {
  navButton.classList.toggle('active');
  navMenu.classList.toggle('active');
};

const closeMenu = () => {
  navButton.classList.remove('active');
  navMenu.classList.remove('active');
};

navButton.addEventListener('click', openMenu);
navLink.forEach((link) => link.addEventListener('click', closeMenu));
