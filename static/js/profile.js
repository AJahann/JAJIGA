import {
  editeNameModal,
  editeNumberModal,
  editeNumberModal2,
  editeEmail,
  editeGender,
  editeAboutYourSelf,
  editeNationalCode,
  changePass,
  deleteAccount,
} from './profileFuncs.js';
import { getUsersData } from './funcs.js';
const $ = document;
const iconEdit = $.querySelectorAll('.icon_edit');
const modalsContainer = $.querySelector('.modals');
const userName = $.querySelector('#name');
const userNumber = $.querySelector('#number');
const userNumber2 = $.querySelector('#number2');
const userEmail = $.querySelector('#email');
const userNationalCode = $.querySelector('#national-number');
const userGender = $.querySelector('#gender');
const userAboutYour = $.querySelector('#about-yourself');
const changePassBtn = $.querySelector('.info-change-pass');
const deleteAccountBtn = $.querySelector('.info-delete-account');
const loading = $.querySelector('.loading');
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

Array.from(iconEdit).forEach((e) => {
  e.addEventListener('click', (e) => {
    switch (e.target.ariaLabel) {
      case 'name':
        editeNameModal(userName.innerHTML);
        break;
      case 'number':
        editeNumberModal(userNumber.innerHTML);
        break;
      case 'number2':
        editeNumberModal2(userNumber2.innerHTML);
        break;
      case 'email':
        editeEmail(userEmail.innerHTML);
        break;
      case 'national-code':
        editeNationalCode(userNationalCode.innerHTML);
        break;
      case 'gender':
        editeGender(userGender.innerHTML);
        break;
      case 'about-your':
        editeAboutYourSelf(userAboutYour.innerHTML);
        break;
      default:
        console.error(`Function for ${e.target.ariaLabel} is not defined`);
    }
  });
});

if (changePassBtn && deleteAccountBtn) {
  changePassBtn.addEventListener('click', () => {
    changePass();
  });
  deleteAccountBtn.addEventListener('click', () => {
    deleteAccount();
  });
}
window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('Id');
  if (userId) {
    getUsersData(userId);
  }
});

let user;
function changeValuesInput(data) {
  user = data;
  userName.innerHTML = data.name + ' ' + data.family;
  userNumber.innerHTML = data.phoneNumber;
  userNumber2.innerHTML = data.phoneNumber2;
  userEmail.innerHTML = data.email;
  userNationalCode.innerHTML = data.nationalCode;
  userGender.innerHTML = data.gender;
  userAboutYour.innerHTML = data.aboutYourself;

  document.body.classList.remove('hide-scroll');
}
function removeLoading() {
  loading.classList.remove('active');
}

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

window.addEventListener('load', () => {
  fetch('https://659d09af633f9aee790872ee.mockapi.io/residence', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    }
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      dataSearch = data.filter((item) => item.actions.length !== 0);
    });
});
export { changeValuesInput, removeLoading, user };
