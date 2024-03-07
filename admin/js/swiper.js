function slider() {
  var swiper = new Swiper('.residence-slider', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      // اینجا تغییر اعمال شده است
      1400: {
        slidesPerView: 3.2,
      },
      1200: {
        slidesPerView: 2.5,
      },
      1000: {
        slidesPerView: 1.9,
      },
      800: {
        slidesPerView: 1.3,
      },
      600: {
        slidesPerView: 1,
      },
    },
  });
}

window.addEventListener('resize', () => {
  slider();
});
slider();
export { slider };
