import { drawCalendar } from './date.js';
import { isLogin } from './funcs.js';
import { addModalNumber } from './modals.js';
const $ = document;
const address = $.querySelector('.room-specification-group-items');
const title = $.querySelector('.room-specification-title');
const desc = $.querySelector('.room_main-context-p');
const generalDetails = $.querySelector('.room-specification-general-details');
const space = $.querySelector('.room_main-space-details');
const sleepSpace = $.querySelector('.room_main-space-sleep-boxs');
const ownerAvatar = $.querySelectorAll('.owner-avatar');
const options = $.querySelector('.residence-details-option');
const price = $.querySelector('.room-rate-price');
const datePickerContainer = $.querySelector('#datePicker');
const reservationBtn = $.querySelector('.room-submit-btn');
const dateWarm = $.querySelector('.room-date-warm');
const roomCountInput = $.querySelector('.room_count-input');
const loading = $.querySelector('.loading');
const searchInput = $.querySelectorAll('.searchBox-input');
const dateEntryElem = $.querySelector('.room-date-entry');
const dateLeaveElem = $.querySelector('.room-date-leave');
const back = $.querySelector('.back');

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

let modalSearch = null;
let userAction = {};
let dataSearch = [];

function setValus(data) {
  let randomNumberImg = randomNumGenerator();
  Array.from(ownerAvatar).forEach((e) => {
    e.src = `https://i.pravatar.cc/150?img=${randomNumberImg}`;
  });

  data.options.premium ||
    (options.querySelector('.residence_option_premium').style.display = 'none');
  data.options.quickly ||
    (options.querySelector('.residence_option_quickly').style.display = 'none');

  title.innerHTML = data.title;

  address.innerHTML = `
    <li class="room-specification-group-item">
      <a href="/index.html"><span itemprop="name">جاجیگا</span></a>
    </li>
    <i class="icon_arrow-head-left-rounded"></i>
    <li class="room-specification-group-item">
      <a href="/rooms.html"><span itemprop="name" id="state">${
        residencesKey[data.state]
      }</span></a>
    </li>
    <i class="icon_arrow-head-left-rounded"></i>
    <li class="room-specification-group-item active">
      <a href="/room.html"><span itemprop="name"><strong id="city">${
        data.city
      }</strong></span></a>
    </li>`;

  desc.innerHTML = `${data.desc}`;

  generalDetails.innerHTML = `
  <div class="room_general-detail-item">
    <i class="icon_semi-detached"></i>
    <div class="room_general-detail-item-text">${data.space.type}</div>
  </div>
  <div class="room_general-detail-item">
    <i class="icon_guests"></i>
    <div class="room_general-detail-item-text">تا ${data.space.maximumCapacity} مهمان</div>
  </div>
  <div class="room_general-detail-item">
    <i class="icon_room"></i>
    <div class="room_general-detail-item-text">${data.countRooms} اتاق‌خواب</div>
  </div>
  <div class="room_general-detail-item">
    <i class="icon_meter"></i>
    <div class="room_general-detail-item-text">${data.space.spaceResidence} متر</div>
  </div>`;

  space.innerHTML = `
  <div>
    <strong>ظرفیت استاندارد:</strong><span>${data.space.standardCapacity} نفر</span>
  </div>
  <div>
    <strong>حداکثر ظرفیت:</strong><span>${data.space.maximumCapacity} نفر</span>
  </div>
  <div>
    <strong>متراژ زیربنا:</strong><span>${data.space.spaceResidence} متر</span>
  </div>
  <div>
    <strong>متراژ محوطه:</strong><span>${data.space.spaceArea} متر</span>
  </div>
  <div>
    <strong>نوع اقامتگاه:</strong><span>${data.space.type}</span>
  </div>
  <div><strong>منطقه:</strong><span>${data.space.areaType}</span></div>`;

  sleepSpace.innerHTML = `
  <div class="room_main-space-sleep-box">
    <div class="room_sleep-box-icon">
      <i class="icon_bed-double"></i><i class="icon_bed-mattress"></i>
    </div>
    <p class="room_sleep-box-title">اتاق 1</p>
    <p class="room_main-sleep-box-txt">1 تخت دونفره</p>
    <p class="room_main-sleep-box-txt">${
      Math.floor(data.space.maximumCapacity / 2) - 1
    } دست رختخواب</p>
  </div>

  <div class="room_main-space-sleep-box">
    <div class="room_sleep-box-icon">
      <i class="icon_bed-double"></i><i class="icon_bed-mattress"></i>
    </div>
    <p class="room_sleep-box-title">اتاق 2</p>
    <p class="room_main-sleep-box-txt">1 تخت دونفره</p>
    <p class="room_main-sleep-box-txt">${Math.ceil(
      data.space.maximumCapacity / 2,
    )} دست رختخواب</p>
  </div>

  <div class="room_main-space-sleep-box">
  <div class="room_sleep-box-icon">
  <i class="icon_bed-mattress"></i>
  </div>
  <p class="room_sleep-box-title">اتاق مشترک</p>
  <p class="room_main-sleep-box-txt">1 دست رختخواب</p>
  </div>`;

  price.innerHTML = `${data.price}<small> تومان</small>`;
}
function setEvents(data) {
  dateEntryElem.addEventListener('click', () => {
    drawCalendar(data);

    let yearAndMonth = $.querySelector('#datePickerYearMonth').innerHTML.split(
      ' ',
    );

    let days = $.querySelectorAll('.date-day-wrapper');
    days.forEach((day) => {
      day.addEventListener('click', (e) => {
        if (
          e.target.tagName == 'DIV' &&
          !e.target.classList.contains('yesterday')
        ) {
          dateEntryElem.innerHTML = `<span>${yearAndMonth[1]}
          / <span>${yearAndMonth[0]}</span> / ${
            e.target.querySelector('.date-picker-day').innerHTML
          }</span>`;

          datePickerContainer.innerHTML = ``;
        }
      });
    });
  });
  dateLeaveElem.addEventListener('click', () => {
    drawCalendar(data, 'false');

    let yearAndMonth = $.querySelector('#datePickerYearMonth').innerHTML.split(
      ' ',
    );

    let days = $.querySelectorAll('.date-day-wrapper');
    days.forEach((day) => {
      day.addEventListener('click', (e) => {
        if (
          e.target.tagName == 'DIV' &&
          !e.target.classList.contains('yesterday')
        ) {
          dateLeaveElem.innerHTML = `<span>${yearAndMonth[1]}
          / <span>${yearAndMonth[0]}</span> / ${
            e.target.querySelector('.date-picker-day').innerHTML
          }</span>`;

          datePickerContainer.innerHTML = ``;
        }
      });
    });
  });

  reservationBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let dateEntry = dateEntryElem.querySelector('span').innerHTML.split('/');
    let dateLeave = dateLeaveElem.querySelector('span').innerHTML.split('/');
    let userActionDateEntry = dateEntryElem.innerHTML
      .replace(/^\s*<span>/, '')
      .replace(/<\/span>\s*$/, '')
      .replace(/\n/g, '')
      .replace(/^\s+/, '') // حذف فاصله‌های اضافی در ابتدای متن
      .replace(/\s+$/, '') // حذف فاصله‌های اضافی در انتهای متن
      .replace(/\s+/g, ' '); // تبدیل فاصله‌های متوالی به یک فاصله
    let userActionDateLeave = dateLeaveElem.innerHTML
      .replace(/^\s*<span>/, '')
      .replace(/<\/span>\s*$/, '')
      .replace(/\n/g, '')
      .replace(/^\s+/, '') // حذف فاصله‌های اضافی در ابتدای متن
      .replace(/\s+$/, '') // حذف فاصله‌های اضافی در انتهای متن
      .replace(/\s+/g, ' '); // تبدیل فاصله‌های متوالی به یک فاصله
    userAction = {
      dateEntry: userActionDateEntry,
      dateLeave: userActionDateLeave,
      countPersons: roomCountInput.value,
      condition: 'تایید نشده',
    };

    if (
      +dateEntry[dateEntry.length - 1] <= +dateLeave[dateLeave.length - 1] &&
      roomCountInput.value > 0
    ) {
      if (!isLogin) {
        addModalNumber();
      } else {
        loading.classList.add('active');
        getUserDate(document.cookie.split('=')[1], userAction);
      }
      return;
    }

    dateWarm.style.display = 'block';
    roomCountInput.style.border = '1.5px solid rgb(255, 0, 0, .4)';
  });
}
function randomNumGenerator() {
  return Math.floor(Math.random() * 40);
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

function getUserDate(phone, action) {
  fetch('https://659d09af633f9aee790872ee.mockapi.io/users')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let user = data.find((item) => item.phoneNumber == phone);
      user.actions.push(action);
      addActionUser(user);
    });
}
function addActionUser(user) {
  fetch(`https://659d09af633f9aee790872ee.mockapi.io/users/${user.id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    // Send your data in the request body as JSON
    body: JSON.stringify(user),
  }).then((res) => {
    if (res.status == 200) {
      window.location.href = '/index.html';
    }
  });
}
back.addEventListener('click', () => {
  window.history.back();
});
window.addEventListener('load', () => {
  let url = window.location.href.split('?')[1];
  let urlParams = new URLSearchParams(url);
  let state = urlParams.get('state');
  let id = urlParams.get('id');

  fetch('https://659d09af633f9aee790872ee.mockapi.io/residence')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      loading.classList.remove('active');
      dataSearch = data.filter((item) => item.actions.length !== 0);
      let residencesData = data.filter((item) => item.name == state)[0];
      let residence = residencesData.actions.find((item) => item.id == id);
      setValus(residence);
      setEvents(residence);
    });
});
