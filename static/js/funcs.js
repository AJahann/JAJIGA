import { changeValuesInput, removeLoading } from './profile.js';
const $ = document;
const body = $.querySelector('body');
const profileBtn = $.querySelector('.profile');
const drawersWrapper = $.querySelector('.drawers-wrapper');
const asideMenu = $.querySelector('.aside-menu');
const drawersClose = $.querySelector('.drawers-close');
const drawersBgBlur = $.querySelector('.drawers-bg-blur');
const modalsContainer = $.querySelector('.modals');
const loading = $.querySelector('.loading');
const back = $.querySelector('.back');

let isLogin = false;

function closeMenu() {
  body.classList.remove('hide-scroll');
  drawersBgBlur.classList.remove('active');
  drawersClose.classList.remove('active');
  asideMenu.classList.remove('active');
  drawersWrapper.classList.remove('active');
}
function changeAside(user) {
  const asideLoginSignup = $.querySelector('.aside-loginSignup-container');
  const lastNavItem = $.querySelector('.nav-menu_items .nav_item:last-child');
  modalsContainer.innerHTML = ``;
  asideLoginSignup.innerHTML = `<div class="aside-loginSignup-container">
    <div class="aside-loginSignup">
      <div class="aside-loginSignup-icon">
        <svg
          class=""
          fill="#d6d6d6"
          viewBox="0 0 32 32"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <clipPath id="clip-path">
              <polygon
                points="0 0 32 0 32 1.23 32 32 0 32 0 0"
                style="fill: none"
              ></polygon>
            </clipPath>
          </defs>
          <g style="clip-path: url('#clip-path')">
            <path
              d="M16,32A16,16,0,1,1,32,16,16,16,0,0,1,16,32ZM16,1.52A14.48,14.48,0,0,0,1.52,16a14.82,14.82,0,0,0,.28,2.82,14.48,14.48,0,0,0,28.4,0A15,15,0,0,0,30.48,16,14.5,14.5,0,0,0,16,1.52Z"
            ></path>
            <path
              d="M20.5,13.5A4.5,4.5,0,1,1,16,9,4.49,4.49,0,0,1,20.5,13.5ZM19,18.71a6,6,0,1,0-5.94,0A9.76,9.76,0,0,0,6.25,28a.75.75,0,0,0,1.5,0,8.25,8.25,0,0,1,15.87-3.16h0A8.18,8.18,0,0,1,24.25,28a.75.75,0,0,0,1.5,0A9.76,9.76,0,0,0,19,18.71Z"
              style="fill-rule: evenodd"
            ></path>
          </g>
        </svg>
      </div>
      <div>
      <p class="aside-userInfo">${user.name + ' ' + user.family}</p>
      <a user-id='${
        user.id
      }' style="font-size: 10px; height: 26px ; padding: 0 8px" class="aside-loginSignup-btn login-signUp"
      href="/profile.html"
      >ویرایش حساب کاربری</a></div>
    </div>
  </div>`;

  const editeProfileBtn = $.querySelector('.aside-loginSignup-btn');
  editeProfileBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = `/profile.html?Id=${user.id}`;
  });

  lastNavItem.innerHTML = `<a class="nav_item" href="/">اعلانات</a>`;

  addLeaveBtn();
}
function loginSuccessful(user) {
  removeLoading();
  changeAside(user);
  isLogin = true;
}
async function getUsersData(id) {
  await fetch('https://659d09af633f9aee790872ee.mockapi.io/users')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const user = data.find((user) => user.id == id);
      changeValuesInput(user);
      removeLoading();
      return user;
    })
    .catch((err) => {
      console.log('Error: ' + err);
    });
}
function addLeaveBtn() {
  const btn = $.querySelector('#addLeaveBtn');
  btn.innerHTML =
    '<i class="icon_info aside_item-icon"></i>خروج';
  btn.addEventListener('click', (e) => {
    document.cookie = `user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    location.reload();
  });
}

export { closeMenu, loginSuccessful, isLogin, getUsersData };
