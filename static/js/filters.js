import {
  residencesData,
  residenceDataNoFilter,
  addResidence,
} from './rooms.js';
const $ = document;
const personsElem = $.querySelector('#f-persons');
const priceElem = $.querySelector('#f-price');
const roomsElem = $.querySelector('#f-rooms');
const optionsElem = $.querySelector('#f-options');
const residenceTypeElem = $.querySelector('#f-type');
const rulesElem = $.querySelector('#f-rules');
const modalContainer = $.querySelector('.modal-filters');
let data = [];
setTimeout(() => {
  data = residencesData;
}, 2000);

function modalFilterMain(position) {
  console.log(position);
  modalContainer.innerHTML = '';

  modalContainer.innerHTML = `<div>
  <div class="modal-filter-wrapper" style="left: ${position.x - 430}px">
    <div class="modal-filter-top"></div>
    <div class="modal-filter-bottom">
      <div class="modal-filter-main-btns">
        <button
          class="modal_filterIgnore"
          name="filter-ignore"
          type="button"
        >
          <i class="icon_delete"></i>پاک کردن
        </button>
        <div>
          <button
            class="modal_filterCancel"
            name="filter-cancel"
            type="button"
          >
            <i class="icon_close"></i>بی خیال
          </button>
          <button
            class="modal_filterSubmit"
            name="filter-submit"
            type="button"
          >
            <i class="icon_search"></i>اعمال
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`;

  const ignoreFilters = $.querySelector('.modal_filterIgnore');
  const cancelFilters = $.querySelector('.modal_filterCancel');
  const submitFilters = $.querySelector('.modal_filterSubmit');

  ignoreFilters.addEventListener('click', () => {
    addResidence(residenceDataNoFilter);
    modalClose();
  });
  cancelFilters.addEventListener('click', () => {
    modalClose();
  });
  submitFilters.addEventListener('click', () => {
    // TODO: Submit
  });

  modalOpen();
  return { ignoreFilters, cancelFilters, submitFilters };
}
function modalPersonsTemplate(e) {
  modalFilterMain(e);
  const { ignoreFilters, cancelFilters, submitFilters } = modalFilterMain(e);

  const container = $.querySelector('.modal-filter-top');
  container.innerHTML = `<div class="modal-filter-persons">
  <div class="modal_persons-wrapper">
      <p class="modal_persons-title">
        تعداد نفرات
      </p>
      <div
        data-test="capacity-stepper"
        class="modal_persons-stepper"
      >
        <button
          data-test="increment"
          class="modal_persons-plus"
          type="button"
        >
          <i
            class="icon_plus"
          ></i>
        </button>
        <div class="modal_persons-data">
            <h3 class="num">1 نفر</h3>
            <p class="txt">(حداقل)</p>
        </div>
        <button
          data-test="decrement"
          class="modal_persons-minus"
          type="button"
          disabled=""
        >
          <i
            class="icon_negative"
          ></i>
        </button>
      </div>
  </div>
  <p class="modal-filter-persons-alert">
    <i class="icon_info-circle"></i> با انتخاب
    تعداد نفرات، نتایج دقیق تری را مشاهده می‌کنید.
  </p>
</div>`;

  const personPlus = $.querySelector('.modal_persons-plus');
  const personMinus = $.querySelector('.modal_persons-minus');
  const personData = $.querySelector('.modal_persons-data .num');

  personPlus.addEventListener('click', () => {
    personData.innerHTML = `${parseInt(personData.innerHTML) + 1} نفر`;
    personMinus.disabled = false;
  });
  personMinus.addEventListener('click', () => {
    personData.innerHTML = `${parseInt(personData.innerHTML) - 1} نفر`;
    parseInt(personData.innerHTML) == 1 ? (personMinus.disabled = true) : null;
  });

  submitFilters.addEventListener('click', () => {
    let actions = residencesData.actions.filter((item) => {
      return item.space.maximumCapacity >= parseInt(personData.innerHTML);
    });
    data.actions = actions;
    addResidence(data);
    modalClose();
  });
}
function modalPriceTemplate(e) {
  modalFilterMain(e);
  const { ignoreFilters, cancelFilters, submitFilters } = modalFilterMain(e);

  const container = $.querySelector('.modal-filter-top');
  container.innerHTML = `
  <div class="modal-filter-price">
    <div class="modal__title">
      <p>محدوده اجاره‌بها</p>
    </div>

    <div class="modal_price-range" style="display: none">
      <div class="modal_price-range-line">
        <div class="modal_price-range-circle-right"></div>
        <div class="modal_price-range-circle-left"></div>
      </div>
    </div>

    <div class="modal_price-inputs">
      <div class="modal_price_labelFrom">
        <p>نرخ هر شب از <span style="color: red">-تومان-</span></p>
        <input type="text" id="priceFrom" name="" placeholder="0" oninput="this.value = this.value.replace(/[^0-9]/g, '')" />

      </div>
      <div class="modal_price-labelTo">
        <p>تا</p>
        <input type="text" id="priceTo" name="" placeholder="25,000,000" oninput="this.value = this.value.replace(/[^0-9]/g, '')" />
      </div>
    </div>
  </div>`;

  const priceFrom = $.querySelector('#priceFrom');
  const priceTo = $.querySelector('#priceTo');

  priceFrom.addEventListener('input', () => {
    priceFrom.value >= 25_000_000
      ? (priceFrom.value = 25_000_000)
      : (priceTo.value = 25_000_000);
  });
  submitFilters.addEventListener('click', () => {
    let actions = residencesData.actions.filter((item) => {
      return item.price >= priceFrom.value && item.price <= priceTo.value;
    });

    data.actions = actions;
    addResidence(data);
    modalClose();
  });
}
function modalRoomsTemplate(e) {
  modalFilterMain(e);
  const { ignoreFilters, cancelFilters, submitFilters } = modalFilterMain(e);

  const container = $.querySelector('.modal-filter-top');
  container.innerHTML = `
  <div class="modal-filter-rooms">
    <div class="modal__title">
      <p>تعداد تخت و اتاق</p>
    </div>

    <div class="modal_rooms-stepper">
      <p class="modal_room-txt">تعداد اتاق خواب</p>
      <div class="modal_room-btns">
        <button type="button" id="btn-room-plus">
          <i class="icon_plus"></i>
        </button>
        <p class="modal_room-data">0</p>
        <button type="button" id="btn-room-minus" disabled>
          <i class="icon_negative"></i>
        </button>
      </div>
    </div>

    <div class="modal_rooms-stepper">
      <p class="modal_room-txt">تعداد تخت</p>
      <div class="modal_room-btns">
        <button type="button" id="btn-bed-plus">
          <i class="icon_plus"></i>
        </button>
        <p class="modal_room-data modal_bed-data">0</p>
        <button type="button" id="btn-bed-minus" disabled>
          <i class="icon_negative"></i>
        </button>
      </div>
    </div>
  </div>`;

  const roomPlus = $.querySelector('#btn-room-plus');
  const roomMinus = $.querySelector('#btn-room-minus');
  const roomData = $.querySelector('.modal_room-data');
  const bedPlus = $.querySelector('#btn-bed-plus');
  const bedMinus = $.querySelector('#btn-bed-minus');
  const bedData = $.querySelector('.modal_bed-data');

  roomPlus.addEventListener('click', () => {
    roomData.innerHTML = parseInt(roomData.innerHTML) + 1;
    roomMinus.disabled = false;
  });
  roomMinus.addEventListener('click', () => {
    roomData.innerHTML = parseInt(roomData.innerHTML) - 1;
    roomData.innerHTML == 1
      ? (roomMinus.disabled = true)
      : (roomMinus.disabled = false);
  });

  bedPlus.addEventListener('click', () => {
    bedData.innerHTML = parseInt(bedData.innerHTML) + 1;
    bedMinus.disabled = false;
  });
  bedMinus.addEventListener('click', () => {
    bedData.innerHTML = parseInt(bedData.innerHTML) - 1;
    bedData.innerHTML == 1
      ? (bedMinus.disabled = true)
      : (bedMinus.disabled = false);
  });

  submitFilters.addEventListener('click', () => {
    let actions = residencesData.actions.filter((item) => {
      return (
        item.countRooms >= roomData.innerHTML &&
        item.space.maximumCapacity >= bedData.innerHTML
      );
    });
    console.log(actions);
    data.actions = actions;
    addResidence(data);
    modalClose();
  });
}
function modalOptionsTemplate(e) {
  modalFilterMain(e);
  const { ignoreFilters, cancelFilters, submitFilters } = modalFilterMain(e);

  const container = $.querySelector('.modal-filter-top');
  container.innerHTML = `
  <div class="modal-filter-options">
    <div class="modal__title">
      <p>ویژگی های اقامتگاه</p>
    </div>

    <div class="modal_options-wrapper">
      <div class="modal_option">
        <div class="modal_option-txt">
          <i class="icon_medal"></i>
          <p>خاص</p>
        </div>
        <label class="modal_option-label-check"
          ><input data-state="ok" type="checkbox" class="" value="special" />
        </label>
      </div>

      <div class="modal_option">
        <div class="modal_option-txt">
          <i class="icon_diamond"></i>
          <p>استخر شنا</p>
        </div>
        <label class="modal_option-label-check"
          ><input data-state="ok" type="checkbox" class="" value="estakhr" />
        </label>
      </div>

      <div class="modal_option">
        <div class="modal_option-txt">
          <i class="icon_waterfront"></i>
          <p>لب ساحل</p>
        </div>
        <label class="modal_option-label-check"
          ><input data-state="ok" type="checkbox" class="" value="sahel" />
        </label>
      </div>

      <div class="modal_option">
        <div class="modal_option-txt">
          <i class="icon_scenic"></i>
          <p>خوش منظره</p>
        </div>
        <label class="modal_option-label-check"
          ><input data-state="ok" type="checkbox" class="" value="view" />
        </label>
      </div>

      <div class="modal_option">
        <div class="modal_option-txt">
          <i class="icon_star-plus-outline"></i>
          <p>ممتاز</p>
        </div>
        <label class="modal_option-label-check"
          ><input data-state="ok" type="checkbox" class="" value="premium" />
        </label>
      </div>

      <div class="modal_option">
        <div class="modal_option-txt">
          <i class="icon_Flash-outline"></i>
          <p>رزرو فوری</p>
        </div>
        <label class="modal_option-label-check"
          ><input data-state="ok" type="checkbox" class="" value="quickly" />
        </label>
      </div>
    </div>
  </div>`;

  const options = document.querySelectorAll('.modal_option');
  let optionsChecked = [];

  options.forEach((item) => {
    const checkbox = item.querySelector('input');
    checkbox.addEventListener('click', () => {
      const isChecked = checkbox.checked;
      if (isChecked) {
        optionsChecked.push(checkbox.value);
      } else {
        optionsChecked = optionsChecked.filter((item) => {
          return item != checkbox.value;
        });
      }
    });
  });

  submitFilters.addEventListener('click', () => {
    let actions = residencesData.actions.filter((item) => {
      return optionsChecked.every((option) => {
        return item.options[option];
      });
    });
    data.actions = actions;
    addResidence(data);
    modalClose();
  });
}
function modalTypeTemplate(e) {
  modalFilterMain(e);
  const { ignoreFilters, cancelFilters, submitFilters } = modalFilterMain(e);

  const container = $.querySelector('.modal-filter-top');
  container.innerHTML = `
  <div class="modal-filter-options">
    <div class="modal__title">
      <p>ویژگی های اقامتگاه</p>
    </div>

    <div class="modal_options-wrapper">
    
      <div class="modal_option">
        <div class="modal_option-txt">
          <p>ویلایی</p>
        </div>
        <label class="modal_option-label-check"
          ><input data-state="ok" type="checkbox" class="" value="ویلایی" />
        </label>
      </div>

      <div class="modal_option">
        <div class="modal_option-txt">
          <p>سوئیت</p>
        </div>
        <label class="modal_option-label-check"
          ><input data-state="ok" type="checkbox" class="" value="سوئیت" />
        </label>
      </div>

      <div class="modal_option">
        <div class="modal_option-txt">
          <p>روستایی</p>
        </div>
        <label class="modal_option-label-check"
          ><input data-state="ok" type="checkbox" class="" value="روستایی" />
        </label>
      </div>

      <div class="modal_option">
        <div class="modal_option-txt">
          <p>کلبه</p>
        </div>
        <label class="modal_option-label-check"
          ><input data-state="ok" type="checkbox" class="" value="کلبه" />
        </label>
      </div>

      <div class="modal_option">
        <div class="modal_option-txt">
          <p>هتل آپارتمان</p>
        </div>
        <label class="modal_option-label-check"
          ><input data-state="ok" type="checkbox" class="" value="هتل آپارتمان" />
        </label>
      </div>
    </div>
  </div>`;

  const options = document.querySelectorAll('.modal_option');
  let optionsChecked = [];

  options.forEach((item) => {
    const checkbox = item.querySelector('input');
    checkbox.addEventListener('click', () => {
      const isChecked = checkbox.checked;
      if (isChecked) {
        optionsChecked.push(checkbox.value);
      } else {
        optionsChecked = optionsChecked.filter((item) => {
          return item != checkbox.value;
        });
      }
    });
  });

  submitFilters.addEventListener('click', () => {
    let actions = residencesData.actions.filter((item) => {
      return optionsChecked.some((type) => item.space.type.includes(type));
    });
    data.actions = actions;
    addResidence(data);
    modalClose();
  });
}
function modalRulesTemplate(e) {
  modalFilterMain(e);
  const { ignoreFilters, cancelFilters, submitFilters } = modalFilterMain(e);

  const container = $.querySelector('.modal-filter-top');
  container.innerHTML = `<div class="modal-filter-rules">
  <div class="modal__title"><p>قوانین</p></div>
</div>
<div class="modal_rules-txt">
  <h3>قوانین تا دیدار بعدی ثابت هستند :)</h3>
</div>`;

  submitFilters.disabled = true;
  submitFilters.style.filter = 'opacity(0.5)';
}
function modalOpen() {
  $.querySelector('body').classList.add('hide-scroll');
  $.querySelector('nav').classList.add('hide');
  $.querySelector('.sc-filter').classList.add('hide');
}
function modalClose() {
  modalContainer.innerHTML = '';
  $.querySelector('body').classList.remove('hide-scroll');
  $.querySelector('nav').classList.remove('hide');
  $.querySelector('.sc-filter').classList.remove('hide');
}

personsElem.addEventListener('click', (e) => {
  modalPersonsTemplate(e);
});
priceElem.addEventListener('click', (e) => {
  modalPriceTemplate(e);
});
roomsElem.addEventListener('click', (e) => {
  modalRoomsTemplate(e);
});
optionsElem.addEventListener('click', (e) => {
  modalOptionsTemplate(e);
});
residenceTypeElem.addEventListener('click', (e) => {
  modalTypeTemplate(e);
});
rulesElem.addEventListener('click', (e) => {
  modalRulesTemplate(e);
});
