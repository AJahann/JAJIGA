import { homeSwiper, residenceSwiperP } from './swiper.js';
const $ = document;
const homeContainer = $.querySelector('.homeSliderWrapper');
const quickAccessSlides = $.querySelectorAll('.quickAccess-slides');
const RSPremiumContainer = $.querySelector('.RSPremiumWrapper'); // RS => Residence Slider
const RSSpecialContainer = $.querySelector('.RSSpecialWrapper');
const RSQuicklyContainer = $.querySelector('.RSQuicklyWrapper');
const RSLuxuryContainer = $.querySelector('.RSLuxuryWrapper');
const RSEconomicContainer = $.querySelector('.RSEconomicWrapper');
const RSTehranContainer = $.querySelector('.RSTehranWrapper');
const RSShomalContainer = $.querySelector('.RSShomalWrapper');
const RSDiscountContainer = $.querySelector('.RSDiscountWrapper');
const navbarDiscountItems = $.querySelectorAll('.residence_dicount_item');
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
  Kerman: 'کرمان',
  Kish: 'کیش',
};

function addHomeTemp(data) {
  let residences = data;

  homeContainer.innerHTML = '';
  for (const residence of residences) {
    homeContainer.insertAdjacentHTML(
      'beforeend',
      `
                 <div class="swiper-slide">
                    <div>
                      <a href="./rooms.html?city=${
                        residence.name
                      }" class="home-slide">
                        <div class="home-slider-image">
                          <img
                            src="/static/img/home/top-locations/${
                              residence.name
                            }.jpg"
                            alt="${residence.name}"
                          />
                        </div>
                        <div class="home-slider-text">
                          <h2>
                            <small>اجاره ویلا در</small>
                            <strong>${residencesKey[residence.name]}</strong>
                          </h2>
                          <small>${residence.actions.length} اقامتگاه</small>
                        </div>
                      </a>
                    </div>
                  </div>`,
    );
    homeSwiper.update();
  }
}
function valuesReservationQuickly(data) {
  let view = 0;
  let sahel = 0;
  let rusta = 0;
  let estakhr = 0;

  Array.from(quickAccessSlides).forEach((item) => {
    switch (true) {
      case item.dataset.option == 'view':
        data.forEach((e) => {
          e.actions.forEach((e) => {
            if (e.options.view) {
              view++;
              item.querySelector('span').innerHTML = `${view} اقامتگاه`;
            }
          });
        });
        break;
      case item.dataset.option == 'sahel':
        data.forEach((e) => {
          e.actions.forEach((e) => {
            if (e.options.sahel) {
              sahel++;
              item.querySelector('span').innerHTML = `${sahel} اقامتگاه`;
            }
          });
        });
        break;
      case item.dataset.option == 'rusta':
        data.forEach((e) => {
          e.actions.forEach((e) => {
            if (e.options.rusta) {
              rusta++;
              item.querySelector('span').innerHTML = `${rusta} اقامتگاه`;
            }
          });
        });
        break;
      case item.dataset.option == 'estakhr':
        data.forEach((e) => {
          e.actions.forEach((e) => {
            if (e.options.estakhr) {
              estakhr++;
              item.querySelector('span').innerHTML = `${estakhr} اقامتگاه`;
            }
          });
        });
        break;

      default:
        console.log('sorry we can"t find anything');
        break;
    }
  });
  //   e.actions.forEach((item) => {
  //     Array.from(quickAccessSlides).forEach((e) => {
  //       switch (true) {
  //         case e.dataset.option == 'view' && item.options.view:
  //           console.log(e);
  //           break;
  //         case e.dataset.option == 'sahel' && item.options.sahel:
  //           console.log(e);
  //           break;
  //         case e.dataset.option == 'rusta' && item.options.rusta:
  //           console.log(e);
  //           break;
  //         case e.dataset.option == 'estakhr' && item.options.estakhr:
  //           console.log(e);
  //           break;

  //         default:
  //           console.log('sorry we can"t find anything');
  //           break;
  //       }
  //     });
  //   });
  // });
}
function residenceSliderPremium(data) {
  RSPremiumContainer.innerHTML = '';

  data.forEach((item) => {
    item.actions.forEach((item) => {
      if (item.options.premium) {
        RSPremiumContainer.insertAdjacentHTML(
          'beforeend',
          `<div class="swiper-slide">
    <a href="/room.html?state=${item.state}&id=${
            item.id
          }" class="residence-slide">
      <div class="residence-top">
        <div class="residence-image">
          <img
            src="static/img/public/residence.jpg"
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
              <small>از</small
              ><span>${item.price}<small> تومان</small></span>
            </div>
          </div>
        </div>
      </div>
      <div class="residence-bottom">
        <h2 class="residence-slide-title">
        ${item.title}
        </h2>
        <div class="residence-slide-context">
        <span class="info">${item.countRooms} خوابه . ${
            item.space.spaceResidence
          } متر . تا ${item.space.maximumCapacity} مهمان</span>

          <span class="rating">
            <span>
              <img
                width="16px"
                height="16px"
                src="https://img.icons8.com/fluency/96/filled-star.png"
                alt="filled-star"
              />
            </span>

            <span>4.7</span>

            <span>(8 نظر) </span>
          </span>
        </div>
      </div>
    </a>
  </div>`,
        );
      }
    });
  });
}
function residenceSliderSpecial(data) {
  RSSpecialContainer.innerHTML = '';

  data.forEach((item) => {
    item.actions.forEach((item) => {
      if (item.options.special) {
        RSSpecialContainer.insertAdjacentHTML(
          'beforeend',
          `<div class="swiper-slide">
    <a href="/room.html?state=${item.state}&id=${
            item.id
          }" class="residence-slide">
      <div class="residence-top">
        <div class="residence-image">
          <img
            src="static/img/public/residence.jpg"
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
              <small>از</small
              ><span>${item.price}<small> تومان</small></span>
            </div>
          </div>
        </div>
      </div>
      <div class="residence-bottom">
        <h2 class="residence-slide-title">
        ${item.title}
        </h2>
        <div class="residence-slide-context">
        <span class="info">${item.countRooms} خوابه . ${
            item.space.spaceResidence
          } متر . تا ${item.space.maximumCapacity} مهمان</span>

          <span class="rating">
            <span>
              <img
                width="16px"
                height="16px"
                src="https://img.icons8.com/fluency/96/filled-star.png"
                alt="filled-star"
              />
            </span>

            <span>4.7</span>

            <span>(8 نظر) </span>
          </span>
        </div>
      </div>
    </a>
  </div>`,
        );
      }
    });
  });
}
function residenceSliderQuickly(data) {
  RSQuicklyContainer.innerHTML = '';

  data.forEach((item) => {
    item.actions.forEach((item) => {
      if (item.options.quickly) {
        RSQuicklyContainer.insertAdjacentHTML(
          'beforeend',
          `<div class="swiper-slide">
    <a href="/room.html?state=${item.state}&id=${
            item.id
          }" class="residence-slide">
      <div class="residence-top">
        <div class="residence-image">
          <img
            src="static/img/public/residence.jpg"
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
              <small>از</small
              ><span>${item.price}<small> تومان</small></span>
            </div>
          </div>
        </div>
      </div>
      <div class="residence-bottom">
        <h2 class="residence-slide-title">
        ${item.title}
        </h2>
        <div class="residence-slide-context">
        <span class="info">${item.countRooms} خوابه . ${
            item.space.spaceResidence
          } متر . تا ${item.space.maximumCapacity} مهمان</span>

          <span class="rating">
            <span>
              <img
                width="16px"
                height="16px"
                src="https://img.icons8.com/fluency/96/filled-star.png"
                alt="filled-star"
              />
            </span>

            <span>4.7</span>

            <span>(8 نظر) </span>
          </span>
        </div>
      </div>
    </a>
  </div>`,
        );
      }
    });
  });
}
function residenceSliderLuxury(data) {
  RSLuxuryContainer.innerHTML = '';

  data.forEach((item) => {
    item.actions.forEach((item) => {
      if (
        item.options.premium &&
        item.options.special &&
        item.options.estakhr &&
        item.price > 2000000
      ) {
        RSLuxuryContainer.insertAdjacentHTML(
          'beforeend',
          `<div class="swiper-slide">
    <a href="/room.html?state=${item.state}&id=${
            item.id
          }" class="residence-slide">
      <div class="residence-top">
        <div class="residence-image">
          <img
            src="static/img/public/residence.jpg"
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
              <small>از</small
              ><span>${item.price}<small> تومان</small></span>
            </div>
          </div>
        </div>
      </div>
      <div class="residence-bottom">
        <h2 class="residence-slide-title">
        ${item.title}
        </h2>
        <div class="residence-slide-context">
        <span class="info">${item.countRooms} خوابه . ${
            item.space.spaceResidence
          } متر . تا ${item.space.maximumCapacity} مهمان</span>

          <span class="rating">
            <span>
              <img
                width="16px"
                height="16px"
                src="https://img.icons8.com/fluency/96/filled-star.png"
                alt="filled-star"
              />
            </span>

            <span>4.7</span>

            <span>(8 نظر) </span>
          </span>
        </div>
      </div>
    </a>
  </div>`,
        );
      }
    });
  });
}
function residenceSliderEconomic(data) {
  RSEconomicContainer.innerHTML = '';

  data.forEach((item) => {
    item.actions.forEach((item) => {
      if (item.price <= 1000000) {
        RSEconomicContainer.insertAdjacentHTML(
          'beforeend',
          `<div class="swiper-slide">
    <a href="/room.html?state=${item.state}&id=${
            item.id
          }" class="residence-slide">
      <div class="residence-top">
        <div class="residence-image">
          <img
            src="static/img/public/residence.jpg"
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
              <small>از</small
              ><span>${item.price}<small> تومان</small></span>
            </div>
          </div>
        </div>
      </div>
      <div class="residence-bottom">
        <h2 class="residence-slide-title">
        ${item.title}
        </h2>
        <div class="residence-slide-context">
        <span class="info">${item.countRooms} خوابه . ${
            item.space.spaceResidence
          } متر . تا ${item.space.maximumCapacity} مهمان</span>

          <span class="rating">
            <span>
              <img
                width="16px"
                height="16px"
                src="https://img.icons8.com/fluency/96/filled-star.png"
                alt="filled-star"
              />
            </span>

            <span>4.7</span>

            <span>(8 نظر) </span>
          </span>
        </div>
      </div>
    </a>
  </div>`,
        );
      }
    });
  });
}
function residenceSliderTehran(data) {
  RSTehranContainer.innerHTML = '';
  let TehranData = data.filter((item) => item.name === 'Tehran');

  TehranData.forEach((item) => {
    item.actions.forEach((item) => {
      RSTehranContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="swiper-slide">
    <a href="/room.html?state=${item.state}&id=${
          item.id
        }" class="residence-slide">
      <div class="residence-top">
        <div class="residence-image">
          <img
            src="static/img/public/residence.jpg"
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
              <small>از</small
              ><span>${item.price}<small> تومان</small></span>
            </div>
          </div>
        </div>
      </div>
      <div class="residence-bottom">
        <h2 class="residence-slide-title">
        ${item.title}
        </h2>
        <div class="residence-slide-context">
        <span class="info">${item.countRooms} خوابه . ${
          item.space.spaceResidence
        } متر . تا ${item.space.maximumCapacity} مهمان</span>

          <span class="rating">
            <span>
              <img
                width="16px"
                height="16px"
                src="https://img.icons8.com/fluency/96/filled-star.png"
                alt="filled-star"
              />
            </span>

            <span>4.7</span>

            <span>(8 نظر) </span>
          </span>
        </div>
      </div>
    </a>
  </div>`,
      );
    });
  });
}
function residenceSliderShomal(data) {
  RSShomalContainer.innerHTML = '';
  let ShomalData = data.filter(
    (item) => item.name === 'Mazandaran' || item.name === 'Shomal',
  );

  ShomalData.forEach((item) => {
    item.actions.forEach((item) => {
      RSShomalContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="swiper-slide">
    <a href="/room.html?state=${item.state}&id=${
          item.id
        }" class="residence-slide">
      <div class="residence-top">
        <div class="residence-image">
          <img
            src="static/img/public/residence.jpg"
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
              <small>از</small
              ><span>${item.price}<small> تومان</small></span>
            </div>
          </div>
        </div>
      </div>
      <div class="residence-bottom">
        <h2 class="residence-slide-title">
        ${item.title}
        </h2>
        <div class="residence-slide-context">
        <span class="info">${item.countRooms} خوابه . ${
          item.space.spaceResidence
        } متر . تا ${item.space.maximumCapacity} مهمان</span>

          <span class="rating">
            <span>
              <img
                width="16px"
                height="16px"
                src="https://img.icons8.com/fluency/96/filled-star.png"
                alt="filled-star"
              />
            </span>

            <span>4.7</span>

            <span>(8 نظر) </span>
          </span>
        </div>
      </div>
    </a>
  </div>`,
      );
    });
  });
}
function residenceDiscountNav(data) {
  navbarDiscountItems.forEach((item) => {
    item.addEventListener('click', () => {
      navbarDiscountItems.forEach((i) => {
        i.classList.remove('active');
      });
      item.classList.add('active');
      residenceDiscount(data, item.dataset.state);
    });
  });
}
function residenceDiscount(data, state) {
  let itemHaveDiscount = [];

  if (state && state !== 'allState') {
    data
      .filter((item) => {
        return item.name === state;
      })[0]
      .actions.forEach((action) => {
        if (action.discount) {
          itemHaveDiscount.push(action);
        }
      });
  } else {
    data.forEach((item) => {
      item.actions.forEach((action) => {
        if (action.discount) {
          itemHaveDiscount.push(action);
        }
      });
    });
  }

  RSDiscountContainer.innerHTML = '';
  itemHaveDiscount.forEach((item) => {
    RSDiscountContainer.insertAdjacentHTML(
      'beforeend',
      `<div class="swiper-slide">
  <a href="/room.html?state=${item.state}&id=${
        item.id
      }" class="residence-slide">
    <div class="residence-top">
      <div class="residence-image">
        <img
          src="static/img/public/residence.jpg"
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
          <p class="residence_price-offer margin-0">${item.price}</p>
          <div class="residence_price-percent">${item.discount}%</div>
          <div class="residence_price">
            <small>از</small
            ><span>${Math.floor(
              item.price * (1 - item.discount / 100),
            )}<small> تومان</small></span>
          </div>
        </div>
      </div>
    </div>
    <div class="residence-bottom">
      <h2 class="residence-slide-title">
      ${item.title}
      </h2>
      <div class="residence-slide-context">
      <span class="info">${item.countRooms} خوابه . ${
        item.space.spaceResidence
      } متر . تا ${item.space.maximumCapacity} مهمان</span>

        <span class="rating">
          <span>
            <img
              width="16px"
              height="16px"
              src="https://img.icons8.com/fluency/96/filled-star.png"
              alt="filled-star"
            />
          </span>

          <span>4.7</span>

          <span>(8 نظر) </span>
        </span>
      </div>
    </div>
  </a>
</div>`,
    );
  });

  if (itemHaveDiscount.length === 0) {
    RSDiscountContainer.innerHTML = `<h3 style="
    width: 100%;
    text-align: center;
    color: black;
    ">متاسفیم درحال حاضر تخفیفی برای شما وجود ندارد :))</h3>`;
  }
}

export function callFunctions(data) {
  addHomeTemp(data);
  valuesReservationQuickly(data);
  residenceSliderPremium(data);
  residenceSliderSpecial(data);
  residenceSliderQuickly(data);
  residenceSliderLuxury(data);
  residenceSliderEconomic(data);
  residenceSliderTehran(data);
  residenceSliderShomal(data);
  residenceDiscountNav(data);
  residenceDiscount(data);
}
