import { closeMenu } from './funcs.js';
import { callFunctions } from './tempFunc.js';

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
const searchInput = document.querySelectorAll('.searchBox-input');
let modalSearch = null;
let dataSearch = [];
const residencesKey = {
  Tehran: 'تهران',
  Mashhad: 'مشهد',
  Isfehan: 'اصفهان',
  Tabriz: 'تبریز',
  Shiraz: 'شیراز',
  Kerman: 'کرمان',
  Mazandaran: 'مازندران',
  Geshm: 'قشم',
  Rasht: 'رشت',
  Shomal: 'شمال',
  Ramsar: 'رامسر',
  Kish: 'کیش',
};

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

function searchByCity(query) {
  let results = [];
  dataSearch.forEach((location) => {
    location.actions.forEach((action) => {
      if (action.city.includes(query)) {
        modalSearch.childNodes[0].innerHTML = '';
        results.push({ city: action.city, state: location.name });
      }
    });
  });
  return results;
}
searchInput.forEach((item) => {
  item.addEventListener('focus', (e) => {
    modalSearch = e.target.parentElement.querySelector('.modal-search');
    modalSearch.innerHTML = `<ul>
      <li>
        <a href="/rooms.html?city=Tehran"
          ><i class="icon_pin-location"></i><span>تهران</span
          ><small> - تهران</small></a
        >
      </li>
      <li>
        <a href="/rooms.html?city=Mazandaran"
          ><i class="icon_pin-location"></i><span>گرگان</span
          ><small> - مازندران</small></a
        >
      </li>
      <li>
        <a href="/rooms.html?city=Tabriz"
          ><i class="icon_pin-location"></i><span>تبریز</span
          ><small> - آذربایجان شرقی</small></a
        >
      </li>
    </ul>`;
    modalSearch.classList.add('active');
  });

  item.addEventListener('input', (e) => {
    let query = e.target.value.trim();
    let searchResults = searchByCity(query);
    searchResults.forEach((item) => {
      modalSearch.childNodes[0].insertAdjacentHTML(
        'beforeend',
        `<li>
      <a href="/rooms.html?city=${item.state}"
        ><i class="icon_pin-location"></i><span>${item.city}</span
        ><small> - ${residencesKey[item.state]}</small></a
      >
    </li>`,
      );
    });
  });

  item.addEventListener('blur', () => {
    modalSearch.classList.remove('active');
    item.value = '';
  });
});

let url;
let isQuestionUrl;
window.addEventListener('scroll', (e) => {
  url = document.URL.split('/');
  isQuestionUrl = url[url.length - 1].split('?');
  if (
    url[url.length - 1] !== 'room.html' &&
    isQuestionUrl[0] !== 'profile.html'
  ) {
    if (window.scrollY > 650) {
      navBar.classList.add('nav-scrolled');
      navScrolledItems.style.visibility = 'visible';
    } else {
      navBar.classList.remove('nav-scrolled');
      navScrolledItems.style.visibility = 'hidden';
    }
  }
  if (url[url.length - 1] == 'room.html') {
    back.addEventListener('click', () => {
      window.history.back();
    });
  }
});
window.addEventListener('load', () => {
  fetch('https://659d09af633f9aee790872ee.mockapi.io/residence')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      loading.classList.remove('active');
      dataSearch = data.filter((item) => item.actions.length !== 0);
      callFunctions(data);
    });
});
