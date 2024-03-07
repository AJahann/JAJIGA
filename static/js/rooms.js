const $ = document;
const container = $.querySelector('.main-container');
const mainInfoResidence = $.querySelector('.main_ifno-title');
const loading = $.querySelector('.loading');
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
const premiumFilter = $.querySelector('.premium');
const quicklyFilter = $.querySelector('.quickly');
const searchInput = document.querySelectorAll('.searchBox-input');
let modalSearch = null;
let dataSearch = [];
let residencesData = [];
let residenceDataNoFilter = [];
let isPremium = false;
let isQuickly = false;

// residences
function addResidence(data) {
  container.innerHTML = ``;
  let randomNumImg = 1;

  for (const residence of data.actions) {
    randomNumImg = randomNumGenerator();

    if (
      (!isPremium || (isPremium && residence.options.premium)) &&
      (!isQuickly || (isQuickly && residence.options.quickly))
    ) {
      container.insertAdjacentHTML(
        'beforeend',
        `<div class="">
    <a href="/room.html?state=${residence.state}&id=${
          residence.id
        }" class="residence-slide">
      <div class="residence-top">
        <div class="residence-image">
          <img src="static/img/public/residence.jpg" alt="Photo" class="residece_img">
        </div>
        <div class="residence_details">
          <div class="residence-details-option">
            <span class="residence_option_premium" style="display: ${
              residence.options.premium || 'none'
            };">
              <i><img width="16px" height="16px" src="https://img.icons8.com/stickers/100/000000/christmas-star.png" alt="christmas-star"></i>
              <p class="margin-0">مـمـتــــــاز</p>
            </span>
            <span class="residence_option_quickly" style="display: ${
              residence.options.quickly || 'none'
            };">
              <i>
                <img width="16px" height="12px" src="https://img.icons8.com/small/96/flash-on.png" alt="flash-on">
              </i>
              <p class="margin-0">رزرو فوری</p>
            </span>
          </div>
        </div>
        <div class="residence-owner-image">
          <img src="https://i.pravatar.cc/150?img=${randomNumImg}" alt="avatar">
        </div>
      </div>
      <div class="residence-bottom">
        <h2 class="residence-slide-title">
          ${residence.title}
        </h2>
        <div class="residence-slide-context">
          <span class="info">${residence.countRooms} خوابه . ${
          residence.space.spaceResidence
        } متر . تا ${residence.space.maximumCapacity} مهمان</span>

          <span class="rating">
            <span>
              <img width="16px" height="16px" src="https://img.icons8.com/fluency/96/filled-star.png" alt="filled-star">
            </span>

            <span>4.7</span>

            <span>(8 نظر) </span>
          </span>
        </div>
      </div>
      <div class="residence-bottom-price">
        <p class="residence-bottom_price">هر شب از</p>
        <p class="residence-bottom_price">${residence.price}</p>
        <p class="residence-bottom_price">تومان</p>
        <div class="residence-bottom-own-info">
          <div>100+ رزرو موفق</div>
        </div>
      </div>
    </a>
  </div>`,
      );
    }
  }

  changeValueInfoRes(data);
}
function changeValueInfoRes(data) {
  let minPrice;

  data.actions.length
    ? (minPrice = data.actions.reduce(
        (min, current) => (current.price < min ? current.price : min),
        data.actions[0].price,
      ))
    : (minPrice = 0);

  mainInfoResidence.innerHTML = `<p class="main_ifno-title">
    <strong>${data.actions.length} اقامتگاه</strong> از <strong>${minPrice}</strong><small> تومان</small>
    </p>`;
}
function randomNumGenerator() {
  return Math.floor(Math.random() * 40);
}

// filter
premiumFilter.addEventListener('click', (e) => {
  premiumFilter.classList.toggle('active');
  if (!premiumFilter.classList.contains('active')) {
    isPremium = false;
    addResidence(residencesData);
  } else {
    isPremium = true;
    addResidence(residencesData);
  }
});
quicklyFilter.addEventListener('click', () => {
  quicklyFilter.classList.toggle('active');
  if (!quicklyFilter.classList.contains('active')) {
    isQuickly = false;
    addResidence(residencesData);
  } else {
    isQuickly = true;
    addResidence(residencesData);
  }
});

// search
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
  let url = window.location.href.split('?')[1];
  let urlParams = new URLSearchParams(url);
  let city = urlParams.get('city');
  searchInput[0].placeholder = `${residencesKey[city]}`;

  fetch('https://659d09af633f9aee790872ee.mockapi.io/residence')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      loading.classList.remove('active');
      dataSearch = data.filter((item) => item.actions.length !== 0);
      residencesData = data.filter((item) => item.name == city)[0];
      residenceDataNoFilter = JSON.parse(JSON.stringify(residencesData));
      addResidence(residencesData);
    });
});

export { residencesData, residenceDataNoFilter, addResidence };
