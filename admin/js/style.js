const sideLinks = document.querySelectorAll(
  '.sidebar .side-menu li a:not(.logout)',
);

sideLinks.forEach((item) => {
  const li = item.parentElement;
  item.addEventListener('click', () => {
    sideLinks.forEach((i) => {
      i.parentElement.classList.remove('active');
    });
    li.classList.add('active');
  });
});

const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar');

menuBar.addEventListener('click', () => {
  sideBar.classList.toggle('close');
});
window.addEventListener('resize', () => {
  menuBarDisplay();
});
function menuBarDisplay() {
  if (window.innerWidth < 768) {
    menuBar.style.display = 'none';
    sideBar.classList.add('close');
  } else {
    menuBar.style.display = 'block';
  }
}
menuBarDisplay();

const searchBtn = document.querySelector(
  '.content nav form .form-input button',
);
const searchBtnIcon = document.querySelector(
  '.content nav form .form-input button .bx',
);
const searchForm = document.querySelector('.content nav form');

const toggler = document.getElementById('theme-toggle');

toggler.addEventListener('change', function () {
  if (this.checked) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
});
