const body = document.querySelector('body');
const profileBtn = document.querySelector('.profile');
const drawersWrapper = document.querySelector('.drawers-wrapper');
const asideMenu = document.querySelector('.aside-menu');
const drawersClose = document.querySelector('.drawers-close');
const drawersBgBlur = document.querySelector('.drawers-bg-blur');
const navBar = document.querySelector('nav');
const navScrolledItems = document.querySelector('.nav-scrolled-items');
const back = document.querySelector('.back');
const loading = document.querySelector('.loading');

profileBtn.addEventListener('click', () => {
  body.classList.add('hide-scroll');
  drawersBgBlur.classList.add('active');
  drawersClose.classList.add('active');
  asideMenu.classList.add('active');
  drawersWrapper.classList.add('active');
});
drawersClose.addEventListener('click', () => {
  closeMenu();
});
drawersWrapper.addEventListener('click', (e) => {
  if (!asideMenu.contains(e.target)) {
    // کلیک خارج از المان‌های منو
    closeMenu();
  }
});

function closeMenu() {
    body.classList.remove('hide-scroll');
    drawersBgBlur.classList.remove('active');
    drawersClose.classList.remove('active');
    asideMenu.classList.remove('active');
    drawersWrapper.classList.remove('active');
}

