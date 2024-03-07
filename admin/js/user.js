import { getDataUsers, deleteDataUser, postDataUser } from './api.js';
const $ = document;
const container = $.querySelector('.container');

function usersPage() {
  container.innerHTML = ``;
  container.innerHTML = `<div class="header">
    <div class="left">
      <h1>کاربران</h1>
      <ul class="breadcrumb">
        <li><a href="#"> لیست کاربران </a></li>
        /
        <li><a href="#" class="active">صفحه اصلی</a></li>
      </ul>
    </div>
  </div>
  <div class="user-filter-section">
    <div>
      <h4 class="user-filter-section-title">(0) کاربر</h4>
  
      <div class="add-user">
        <button class="add-user-btn" id="addUserBtn">+ افزودن کاربر</button>
      </div>
    </div>
  
    <div>
      <form class="search-form">
        <div class="form-input">
          <input maxlength="10" id="searchInput" type="search" placeholder="جستجو کاربر (+98)" />
          <button id="searchBtn" class="search-btn" type="submit">
            <i class="bx bx-search"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
  
  <div class="userList">
    <div class="table">
      <table>
        <thead>
          <tr>
            <th class="id-width-table">#</th>
            <th class="img-width-table">تصویر</th>
            <th class="name-width-table">نام/نام خانوادگی</th>
            <th class="number-width-table">شماره موبایل</th>
            <th class="login-width-table">عضویت</th>
            <th class="order-width-table">فعالیت</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>`;

  const usersContainer = document.querySelector('tbody');
  const usersLength = document.querySelector('.user-filter-section-title');
  const searchInput = document.querySelector('#searchInput');
  const searchBtn = document.querySelector('#searchBtn');
  const addUserBtn = document.querySelector('#addUserBtn');

  addUserBtn.addEventListener('click', (e) => {
    addUserPage();
  });
  searchUser(usersContainer, searchInput, searchBtn, usersLength);
  getUsersToPage(usersContainer, usersLength);
}
function getUsersToPage(container, usersLength) {
  let dateLogin, randomNum;

  getDataUsers().then((users) => {
    users.forEach((user) => {
      dateLogin = user.dateLogin.split('');
      randomNum = Math.floor(Math.random() * 45);

      usersLength.innerHTML = `(${users.length}) کاربر`;

      container.insertAdjacentHTML(
        'beforeend',
        `<tr>
        <th class="id-width-table">${user.id} <div data-id='${
          user.id
        }' class='userRemoveBtn'></div></th>
        <td class="img-width-table">
          <img src="https://i.pravatar.cc/150?img=${randomNum}" alt="profile">
        </td>
        <td class="name-width-table">${user.name} ${user.family}</td>
        <td class="number-width-table">0${user.phoneNumber}</td>
        <td class="login-width-table">${
          dateLogin[0] +
          dateLogin[1] +
          dateLogin[2] +
          dateLogin[3] +
          dateLogin[4] +
          dateLogin[5] +
          dateLogin[6] +
          dateLogin[7] +
          dateLogin[8] +
          dateLogin[9]
        }</td>
        <td class="order-width-table">${user.actions.length}</td>
      </tr>`,
      );
    });

    const trElems = document.querySelectorAll('tr');
    userRemoveBtnActive(trElems);
  });
}
function searchUser(container, input, btn, usersLength) {
  let inputValue = null;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    inputValue = input.value;

    getDataUsers().then((users) => {
      users.some((user) => {
        let dateLogin = user.dateLogin.split('');
        if (user.phoneNumber == inputValue) {
          usersLength.innerHTML = `(1) کاربر`;
          container.innerHTML = `<tr>
            <th class="id-width-table">1</th>
            <td class="img-width-table">
              <img src="./images/profile-1.jpg" alt="profile">
            </td>
            <td class="name-width-table">${user.name} ${user.family}</td>
            <td class="number-width-table">0${user.phoneNumber}</td>
            <td class="login-width-table">${
              dateLogin[0] +
              dateLogin[1] +
              dateLogin[2] +
              dateLogin[3] +
              dateLogin[4] +
              dateLogin[5] +
              dateLogin[6] +
              dateLogin[7] +
              dateLogin[8] +
              dateLogin[9]
            }</td>
            <td class="order-width-table">${user.actions.length}</td>
          </tr>`;
          return true;
        }
      });
    });
  });
}
function addUserPage() {
  container.innerHTML = '';
  container.innerHTML = `<div class="header">
  <div class="left">
    <h1>کاربران</h1>
    <ul class="breadcrumb">
      <li><a href="#"> لیست کاربران </a></li>
      /
      <li><a href="#" class="active">افزودن کاربر</a></li>
    </ul>
  </div>
</div>

<div class="add-user-wrapper">
  <div class="add-user-wrapper-right">
    <div>
      <label for="firstName">
        <span>نام</span>
        <input type="text" placeholder="نام" id="firstName" />
      </label>
    </div>

    <div>
      <label for="lastName">
        <span>نام خانوادگی</span>
        <input type="text" placeholder="نام خانوادگی" id="lastName" />
      </label>
    </div>

    <div>
      <label for="phoneNumber">
        <span>تلفن همراه</span>
        <input
          type="text"
          placeholder="تلفن همراه"
          id="phoneNumber"
        />
      </label>
    </div>

    <div>
      <label for="phoneNumber2">
        <span>تلفن اضطراری</span>
        <input
          type="text"
          placeholder="تلفن اضطراری"
          id="phoneNumber2"
        />
      </label>
    </div>

    <div>
      <label for="email">
        <span>ایمیمل</span>
        <input type="email" placeholder="ایمیل" id="email" />
      </label>
    </div>

    <div>
      <label for="password">
        <span>پسورد</span>
        <input type="password" placeholder="پسورد" id="password" />
      </label>
    </div>
  </div>
  <div class="add-user-wrapper-left">
    <div>
      <label for="gender">
        <span>جنسیت</span>
        <input type="text" placeholder="جنسیت" id="gender" />
      </label>
    </div>

    <div>
      <label for="nationalCode">
        <span>کد ملی</span>
        <input type="text" placeholder="کد ملی" id="nationalCode" />
      </label>
    </div>

    <div>
      <label for="aboutYourSelf">
        <span>توضیحات کاربر</span>
        <textarea
          cols="33"
          placeholder="توضیحات"
          id="aboutYourSelf"
          class="textArea textAreaUser"
        ></textarea>
      </label>
    </div>

    <button type="submit" class="submitUser" id="submitUser">افزودن</button>
  </div>
</div>`;

  const name = $.getElementById('firstName');
  const family = $.getElementById('lastName');
  const phoneNumber = $.getElementById('phoneNumber');
  const phoneNumber2 = $.getElementById('phoneNumber2');
  const email = $.getElementById('email');
  const password = $.getElementById('password');
  const gender = $.getElementById('gender');
  const nationalCode = $.getElementById('nationalCode');
  const aboutYourSelf = $.getElementById('aboutYourSelf');
  const submitUser = $.getElementById('submitUser');

  submitUser.addEventListener('click', (e) => {
    e.preventDefault();
    const data = {
      name: name.value,
      family: family.value,
      phoneNumber: phoneNumber.value,
      phoneNumber2: phoneNumber2.value,
      email: email.value,
      password: password.value,
      gender: gender.value,
      nationalCode: nationalCode.value,
      aboutYourself: aboutYourSelf.value,
    };
    postDataUser(data);
    setTimeout(() => {
      location.reload();
    }, 500);
  });
}
function userRemoveBtnActive(trElems) {
  let userRemoveBtn;
  trElems.forEach((tr) => {
    tr.addEventListener('mouseover', (e) => {
      userRemoveBtn = e.target.parentElement.querySelector('.userRemoveBtn');
      if (userRemoveBtn) {
        userRemoveBtn.classList.add('active');
        userRemoveBtn.addEventListener('click', (e) => {
          deleteDataUser(e.target.dataset.id);
          e.target.parentElement.parentElement.remove();
        });
      }
    });

    tr.addEventListener('mouseout', (e) => {
      if (userRemoveBtn) {
        userRemoveBtn.classList.remove('active');
      }
    });
  });
}
export { usersPage };
