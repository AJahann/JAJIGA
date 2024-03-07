import { slider } from './swiper.js';
import {
  getDataResidence,
  putDataResidence,
  dataObjectResidence,
} from './api.js';
const $ = document;
const container = $.querySelector('.container');
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

function residencePage() {
  container.innerHTML = ``;

  container.innerHTML = `
   <div class="residences">
    <div class="header">
      <div class="left">
        <h1>اقامتگاه ها</h1>
       <ul class="breadcrumb">
         <li><a href="#"> اقامتگاه</a></li>
          /
         <li><a href="#" class="active">صفحه اصلی</a></li>
       </ul>
     </div>
   </div>
   <div class="residences-wrapper"></div>
  </div>`;

  const residencesContainer = $.querySelector('.residences-wrapper');

  getDataResidence().then((data) => {
    for (let key of data) {
      addResidenceBtn(residencesContainer, key, key.name);
      slider();
    }
    removeSlides(data);
    const addResidence = $.querySelectorAll('.add-residence');

    Array.from(addResidence).forEach((elem) => {
      elem.addEventListener('click', (e) => {
        e.preventDefault();
        addResidencePageTemplate(data, elem.dataset.id, elem.name);
      });
    });
  });
}
function addResidenceBtn(container, data, state) {
  container.insertAdjacentHTML(
    'beforeend',
    `<div class="residence">
    <h2 class="residence-title">${residencesKey[state]}</h2>
  
    <div class="residence-slider swiper">
      <div class="swiper-wrapper" id="${state}Slides">
        <div class="swiper-slide">
          <button href="/" class="add-residence" data-id="${data.id}" name="${state}">
            <img src="images/icons8-plus-96.png" alt="Add" />
            <h3>افزوردن اقامتگاه جدید</h3>
          </button>
        </div>
        
      </div>
      <span
        class="swiper-notification"
        aria-live="assertive"
        aria-atomic="true"
      ></span>
    </div>
  </div>`,
  );

  residenceTemplate(data.actions, state);
}
function residenceTemplate(data, state) {
  let container = $.querySelector(`#${state}Slides`);

  for (const item of data) {
    container.insertAdjacentHTML(
      'beforeend',
      `<div class="swiper-slide">
      <a href="/" class="residence-slide" data-state="${item.state}" data-id="${
        item.id
      }"  onmouseenter="this.querySelector('.removeSlide').classList.add('active')"
      onmouseleave="this.querySelector('.removeSlide').classList.remove('active')">
      <div class="removeSlide">X حذف اقامتگاه</div>
        <div class="residence-top">
          <div class="residence-image">
            <img
              src="../static/img/public/residence.jpg"
              alt="Photo"
              class="residece_img"
            />
          </div>
          <div class="residence_details">
            <div class="residence-details-option">
              <span class="residence_option_premium" style="display: ${
                item.options.premium || 'none'
              };">
                <i
                  ><img
                    width="16px"
                    height="16px"
                    src="https://img.icons8.com/stickers/100/000000/christmas-star.png"
                    alt="christmas-star"
                /></i>
                <p class="margin-0">مـمـتــــــاز</p>
              </span>
              <span class="residence_option_quickly" style="display: ${
                item.options.quickly || 'none'
              };">
                <i>
                  <img
                    width="16px"
                    height="12px"
                    src="https://img.icons8.com/small/96/flash-on.png"
                    alt="flash-on"
                  />
                </i>
                <p class="margin-0">رزرو فوری</p>
              </span>
            </div>
            <div class="residence-details-price">
              <div class="residence_price">
                <small>از</small><span>${item.price}<small> تومان</small></span>
              </div>
            </div>
          </div>
        </div>
        <div class="residence-bottom">
          <h2 class="residence-slide-title">${item.title}</h2>
          <div class="residence-slide-context">
            <span class="info">${item.countRooms} خوابه . ${
        item.space.spaceResidence
      } متر . تا ${item.space.maximumCapacity} مهمان</span>
          </div>
        </div>
      </a>
    </div>
    `,
    );
  }
}
function removeSlides(data) {
  let slides = $.querySelectorAll('.residence-slide');

  Array.from(slides).forEach((elem) => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      // Tehran 1 {data}
      data.forEach((item) => {
        if (item.name == elem.dataset.state) {
          item.actions.forEach((innerItem) => {
            if (innerItem.id == elem.dataset.id) {
              const index = item.actions.indexOf(innerItem);
              item.actions.splice(index, 1);
            }
          });
        }
      });
      e.target.parentElement.parentElement.remove();
      data.forEach((item) => {
        if (item.name == elem.dataset.state) {
          putDataResidence(item, item.id);
        }
      });
    });
  });
}
function addResidencePageTemplate(data, id, stateValue) {
  container.innerHTML = ``;
  container.innerHTML = `<div class="header">
  <div class="left">
    <h1>اقامتگاه ها</h1>
    <ul class="breadcrumb">
      <li><a href="#">اقامتگاه</a></li>
      /
      <li><a href="#" class="active">افزودن اقامتگاه</a></li>
    </ul>
  </div>
</div>
  
  <form action="#" class="add-residence-form">
  <div class="add-residence-form-right">
    <div>
      <label>عنوان</label>
      <input id="title" type="text" placeholder="عنوان اقامتگاه" />
    </div>

    <div>
      <label>درباره اقامتگاه</label>
      <textarea
        placeholder="توضیحات کلی در مورد اقامتگاه..."
        name=""
        id="desc"
        class="textArea"
        cols="48"
        rows="8"
      ></textarea>
    </div>

    <div>
      <label>فضای اقامتگاه</label>
      <div class="add_form-residence-space-wrapper">
        <input
          type="text"
          placeholder="ظرفیت استاندارد"
          id="standardCapacity"
        />
        <input
          id="maximumCapacity"
          type="text"
          placeholder="حداکثر ظرفیت"
        />
        <input
          id="spaceResidence"
          type="text"
          placeholder="متراژ زیربنا"
        />
        <input id="spaceArea" type="text" placeholder="متراژ محوطه" />
        <input
          id="type"
          type="text"
          placeholder="نوع اقامتگاه-- ویلایی/کلبه/سوئیت..."
        />
        <input
          id="areaType"
          type="text"
          placeholder="منطقه-- شهری/روستایی/خارج شهر"
        />
      </div>
    </div>

    <div>
      <label>فضای خواب</label>
      <input
        id="countRooms"
        placeholder="تعداد اتاق خواب"
        type="text"
      />
    </div>

    <div>
      <label>اجاره روزانه</label>
      <input id="price" placeholder="برای هر شب*" type="text" />
    </div>

    <div>
      <label>موارد دیگر</label>
      <div class="options">
        <div class="options-row">
          <div>
            <span>ممتاز</span>
            <input id="isPremium" type="checkbox" />
          </div>
          <div>
            <span>رزرو سریع</span>
            <input id="isQuickly" type="checkbox" />
          </div>
          <div>
            <span>خاص پسند</span>
            <input id="isSpecial" type="checkbox" />
          </div>
        </div>
        <div class="options-row">
          <div>
            <span>استخر</span>
            <input id="isEstakhr" type="checkbox" />
          </div>
          <div>
            <span>نزدیک ساحل</span>
            <input id="isSahel" type="checkbox" />
          </div>
          <div>
            <span>ویو ابدی</span>
            <input id="isView" type="checkbox" />
          </div>
        </div>
        <div class="options-row">
          <div>
            <span>روستایی</span>
            <input id="isRusta" type="checkbox" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="add-residence-form-left">
    <h3>تصاویر اقامتگاه</h3>
    <span style="color: red; opacity: 0.5"
      >تا اطلاع بعدی امکان آپلود عکس میسر نخواهد بود</span
    >

    <div>
      <span>تصویر 1</span>
      <input disabled type="file" name="" id="" />
    </div>

    <div>
      <span>تصویر 2</span>
      <input disabled type="file" name="" id="" />
    </div>

    <div>
      <span>تصویر 3</span>
      <input disabled type="file" name="" id="" />
    </div>

    <div>
      <span>تصویر 4</span>
      <input disabled type="file" name="" id="" />
    </div>

    <div>
      <span>تصویر 5</span>
      <input disabled type="file" name="" id="" />
    </div>

    <button type="submit" class="add-residence-btn">افزودن</button>

    <div class="residence-address">
      <div>
        <label>استان :</label>
        <select disabled id="province" name="province">
          <option selected id="state" value="${stateValue}">
            ${residencesKey[stateValue]}
          </option>
        </select>
      </div>

      <div>
        <label>شهر :</label>
        <input
          type="text"
          id="city"
          placeholder="محل اقامتگاه(شهر*)"
        />
      </div>
    </div>
    <div class="discount-wrapper">
      <label class="discount-label">تخفیف</label>
      <input id="discount" class="discount-input" placeholder="تخفیف (درصد)*" type="number">
    </div>
  </div>
</form>`;

  const title = $.querySelector('#title');
  const desc = $.querySelector('#desc');
  const standardCapacity = $.querySelector('#standardCapacity');
  const maximumCapacity = $.querySelector('#maximumCapacity');
  const spaceResidence = $.querySelector('#spaceResidence');
  const spaceArea = $.querySelector('#spaceArea');
  const type = $.querySelector('#type');
  const areaType = $.querySelector('#areaType');
  const countRooms = $.querySelector('#countRooms');
  const price = $.querySelector('#price');
  const discount = $.querySelector('#discount');
  const city = $.querySelector('#city');
  const state = $.querySelector('#state');
  const premiumElem = $.querySelector('#isPremium');
  const quicklyElem = $.querySelector('#isQuickly');
  const sahelElem = $.querySelector('#isSahel');
  const viewElem = $.querySelector('#isView');
  const rustaElem = $.querySelector('#isRusta');
  const estakhrElem = $.querySelector('#isEstakhr');
  const specialElem = $.querySelector('#isSpecial');

  let dataResidence = [];
  let premium = false;
  let quickly = false;
  let sahel = false;
  let view = false;
  let rusta = false;
  let estakhr = false;
  let special = false;
  let addResidenceInfo = $.querySelector('.add-residence-btn');

  data.forEach((item) => {
    if (item.id == id) {
      dataResidence = item;
    }
  });
  premiumElem.addEventListener('change', (e) => {
    premium = e.target.checked ? true : false;
  });
  quicklyElem.addEventListener('change', (e) => {
    quickly = e.target.checked ? true : false;
  });
  sahelElem.addEventListener('change', (e) => {
    sahel = e.target.checked ? true : false;
  });
  viewElem.addEventListener('change', (e) => {
    view = e.target.checked ? true : false;
  });
  rustaElem.addEventListener('change', (e) => {
    rusta = e.target.checked ? true : false;
  });
  estakhrElem.addEventListener('change', (e) => {
    estakhr = e.target.checked ? true : false;
  });
  specialElem.addEventListener('change', (e) => {
    special = e.target.checked ? true : false;
  });

  addResidenceInfo.addEventListener('click', (e) => {
    e.preventDefault();
    let obj = {
      title,
      desc,
      standardCapacity,
      maximumCapacity,
      spaceResidence,
      spaceArea,
      type,
      areaType,
      countRooms,
      price,
      discount,
      city,
      state,
      premium,
      quickly,
      sahel,
      view,
      rusta,
      estakhr,
      special,
      dataResidence,
    };

    dataResidence.actions.push(dataObjectResidence(obj));
    putDataResidence(dataResidence, id).then((res) => {
      residencePage();
    });
  });
}

export { residencePage };
