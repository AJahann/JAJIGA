import { closeModal } from './modals.js';
import { changeValuesInput, user } from './profile.js';
import { setCookie } from './cookie.js';
const $ = document;
const modalsContainer = $.querySelector('.modals');

function editeNameModal(fullName) {
  let fullNameArr = fullName.split(' ');
  modalsContainer.innerHTML = '';

  modalsContainer.insertAdjacentHTML(
    'beforeend',
    `<div>
        <div class="modal">
          <div class="modal-container">
            <div class="modal-close">
              <button
                aria-label="close"
                class="drawers-close-btn"
                type="button"
              >
                <i class="drawers-close-icon" aria-label="close"></i>
              </button>
            </div>
            <div class="modal-wrapper">
              <h3 class="profile-modal-title">ویرایش نام و نام‌خانوادگی</h3>

              <form>
                <div class="modal-form profile-modal-form">
                  <label>
                    <span> <span>نام</span> </span>
                    <div class="profile-input-div">
                      <input
                        type="text"
                        name="name"
                        id="userName"
                        value="${fullNameArr[0]}"
                        class="profile-modal-input"
                      />
                    </div>
                  </label>
                  <label>
                    <span> <span>نام خانوادگی</span> </span>
                    <div class="profile-input-div">
                      <input
                        type="text"
                        name="family"
                        id="userFamily"
                        value="${fullNameArr[1]}"
                        class="profile-modal-input"
                      />
                    </div>
                  </label>
                </div>
                <button
                  id="saveName"
                  class="modal-form-btn profile-modal-btn"
                  name="saveName"
                >
                  ذخیره
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>`,
  );

  let saveNameBtn = $.querySelector('#saveName');
  saveNameBtn.addEventListener('click', (e) => {
    e.preventDefault();
    user.name = $.querySelector('#userName').value;
    user.family = $.querySelector('#userFamily').value;
    postData(user);
    changeValuesInput(user);
    modalsContainer.innerHTML = '';
  });

  closeModal();
}
function editeNumberModal(number) {
  modalsContainer.innerHTML = '';

  modalsContainer.insertAdjacentHTML(
    'beforeend',
    `<div>
        <div class="modal">
          <div class="modal-container">
            <div class="modal-close">
              <button
                aria-label="close"
                class="drawers-close-btn"
                type="button"
              >
                <i class="drawers-close-icon" aria-label="close"></i>
              </button>
            </div>
            <div class="modal-wrapper">
              <h3 class="profile-modal-title">ویرایش تلفن همراه</h3>

              <form>
                <div class="modal-form profile-modal-form">
                  <label>
                    <span> <span>شماره همراه</span> </span>
                    <div class="profile-input-div">
                      <input
                        type="text"
                        name="number1"
                        id="userNumber1"
                        value="${number}"
                        maxlength="11"
                        class="profile-modal-input"
                      />
                    </div>
                  </label>
                </div>
                <button
                  id="number1"
                  class="modal-form-btn profile-modal-btn"
                  name="number"
                >
                  ذخیره
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>`,
  );

  let saveNumber1Btn = $.querySelector('#number1');
  saveNumber1Btn.addEventListener('click', (e) => {
    e.preventDefault();
    user.phoneNumber = $.querySelector('#userNumber1').value;
    postData(user);
    changeValuesInput(user);
    setCookie('user', user.phoneNumber, 7);
    modalsContainer.innerHTML = '';
  });

  closeModal();
}
function editeNumberModal2(number2) {
  modalsContainer.innerHTML = '';

  modalsContainer.insertAdjacentHTML(
    'beforeend',
    `<div>
        <div class="modal">
          <div class="modal-container">
            <div class="modal-close">
              <button
                aria-label="close"
                class="drawers-close-btn"
                type="button"
              >
                <i class="drawers-close-icon" aria-label="close"></i>
              </button>
            </div>
            <div class="modal-wrapper">
              <h3 class="profile-modal-title">ویرایش شماره تماس اضطراری</h3>

              <form>
                <div class="modal-form profile-modal-form">
                  <label>
                    <span> <span>شماره اضطراری</span> </span>
                    <div class="profile-input-div">
                      <input
                        type="text"
                        name="number2"
                        id="userNumber2"
                        value="${number2}"
                        maxlength="11"
                        class="profile-modal-input"
                      />
                    </div>
                  </label>
                </div>
                <button
                  id="phoneNume2"
                  class="modal-form-btn profile-modal-btn"
                  name="number2"
                >
                  ذخیره
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>`,
  );
  let saveNumber2Btn = $.querySelector('#phoneNume2');
  saveNumber2Btn.addEventListener('click', (e) => {
    e.preventDefault();
    user.phoneNumber2 = $.querySelector('#userNumber2').value;
    postData(user);
    changeValuesInput(user);
    modalsContainer.innerHTML = '';
  });

  closeModal();
}
function editeEmail(email) {
  modalsContainer.innerHTML = '';

  modalsContainer.insertAdjacentHTML(
    'beforeend',
    `<div>
        <div class="modal">
          <div class="modal-container">
            <div class="modal-close">
              <button
                aria-label="close"
                class="drawers-close-btn"
                type="button"
              >
                <i class="drawers-close-icon" aria-label="close"></i>
              </button>
            </div>
            <div class="modal-wrapper">
              <h3 class="profile-modal-title">ویرایش آدرس ایمیل</h3>

              <form>
                <div class="modal-form profile-modal-form">
                  <label>
                    <span> <span>آدرس ایمیل</span> </span>
                    <div class="profile-input-div">
                      <input
                        type="email"
                        name="email"
                        id="userEmail"
                        value="${email}"
                        class="profile-modal-input"
                      />
                    </div>
                  </label>
                </div>
                <button
                  id="editeEmail"
                  class="modal-form-btn profile-modal-btn"
                  name="editeEmail"
                >
                  ذخیره
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>`,
  );
  let saveEmailBtn = $.querySelector('#editeEmail');
  saveEmailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    user.email = $.querySelector('#userEmail').value;
    postData(user);
    changeValuesInput(user);
    modalsContainer.innerHTML = '';
  });

  closeModal();
}
function editeGender(gender) {
  modalsContainer.innerHTML = '';

  modalsContainer.insertAdjacentHTML(
    'beforeend',
    `<div>
        <div class="modal">
          <div class="modal-container">
            <div class="modal-close">
              <button
                aria-label="close"
                class="drawers-close-btn"
                type="button"
              >
                <i class="drawers-close-icon" aria-label="close"></i>
              </button>
            </div>
            <div class="modal-wrapper">
              <h3 class="profile-modal-title">ویرایش جنسیت</h3>

              <form>
                <div class="modal-form profile-modal-form">
                  <label>
                    <span> <span> جنسیت</span> </span>
                    <div class="profile-input-div">
                      <input
                        type="text"
                        name="gender"
                        id="userGender"
                        value="${gender}"
                        class="profile-modal-input"
                      />
                    </div>
                  </label>
                </div>
                <button
                  id="editeGender"
                  class="modal-form-btn profile-modal-btn"
                  name="editeGender"
                >
                  ذخیره
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>`,
  );
  let saveGenderBtn = $.querySelector('#editeGender');
  saveGenderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    user.gender = $.querySelector('#userGender').value;
    postData(user);
    changeValuesInput(user);
    modalsContainer.innerHTML = '';
  });

  closeModal();
}
function editeAboutYourSelf(value) {
  modalsContainer.innerHTML = '';

  modalsContainer.insertAdjacentHTML(
    'beforeend',
    `<div>
        <div class="modal">
          <div class="modal-container">
            <div class="modal-close">
              <button
                aria-label="close"
                class="drawers-close-btn"
                type="button"
              >
                <i class="drawers-close-icon" aria-label="close"></i>
              </button>
            </div>
            <div class="modal-wrapper">
              <h3 class="profile-modal-title">ویرایش درباره خودتان</h3>

              <form>
                <div class="modal-form profile-modal-form">
                  <label>
                    <span> <span> درباره خودتان</span> </span>
                    <div class="profile-input-div" style='height: 200px'>
                    <textarea placeholder="توضیحات کلی در مورد خودتان..." name="" id="profileTextArea" style="height: 209px;"></textarea>
                    </div>
                  </label>
                </div>
                <button
                  id="aboutYourSelf"
                  class="modal-form-btn profile-modal-btn"
                  name="editeAbout"
                >
                  ذخیره
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>`,
  );
  let saveAboutBtn = $.querySelector('#aboutYourSelf');
  saveAboutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    user.aboutYourself = $.querySelector('#profileTextArea').value;
    postData(user);
    changeValuesInput(user);
    modalsContainer.innerHTML = '';
  });

  closeModal();
}
function editeNationalCode(code) {
  modalsContainer.innerHTML = '';

  modalsContainer.insertAdjacentHTML(
    'beforeend',
    `<div>
        <div class="modal">
          <div class="modal-container">
            <div class="modal-close">
              <button
                aria-label="close"
                class="drawers-close-btn"
                type="button"
              >
                <i class="drawers-close-icon" aria-label="close"></i>
              </button>
            </div>
            <div class="modal-wrapper">
              <h3 class="profile-modal-title">ویرایش کد ملی</h3>

              <form>
                <div class="modal-form profile-modal-form">
                  <label>
                    <span> <span> کد ملی</span> </span>
                    <div class="profile-input-div">
                      <input
                        type="text"
                        name="code"
                        id="userCode"
                        value="${code}"
                        maxlength="10"
                        class="profile-modal-input"
                      />
                    </div>
                  </label>
                </div>
                <button
                  id="nationalCode"
                  class="modal-form-btn profile-modal-btn"
                  name="editeCode"
                >
                  ذخیره
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>`,
  );
  let saveCodeBtn = $.querySelector('#nationalCode');
  saveCodeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    user.nationalCode = $.querySelector('#userCode').value;
    postData(user);
    changeValuesInput(user);
    modalsContainer.innerHTML = '';
  });

  closeModal();
}

function changePass() {
  modalsContainer.innerHTML = '';

  modalsContainer.insertAdjacentHTML(
    'beforeend',
    `<div>
      <div class="modal">
        <div class="modal-container">
          <div class="modal-close">
            <button
              aria-label="close"
              class="drawers-close-btn"
              type="button"
            >
              <i class="drawers-close-icon" aria-label="close"></i>
            </button>
          </div>
          <div class="modal-wrapper">
            <h3 class="profile-modal-title">تغییر رمز عبور</h3>

            <form>
              <div class="modal-form profile-modal-form">
                <label>
                  <span>رمز عبور جدید</span>
                  <div class="modal_label-number">
                    <input
                      id="password1"
                      type="password"
                      class="modal-form-phone"
                      autocomplete="new-password"
                    />
                    <div class="modal-form-eye-password">
                      <i class="icon-eye" id="eyeIcon"></i>
                    </div>
                  </div>
                </label>
                <label>
                  <span>تکرار رمز عبور جدید</span>
                  <div class="modal_label-number">
                    <input
                      id="password2"
                      type="password"
                      class="modal-form-phone"
                      autocomplete="new-password"
                    />
                    <div class="modal-form-eye-password">
                      <i class="icon-eye" id="eyeIcon2"></i>
                    </div>
                  </div>
                </label>
              </div>
              <button
                id="changePassBtn"
                class="modal-form-btn profile-modal-btn"
                name="changePassBtn"
              >
                ذخیره
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>`,
  );

  let password1 = document.querySelector('#password1');
  let password2 = document.querySelector('#password2');
  let eyeIcon = document.querySelector('#eyeIcon');
  let eyeIcon2 = document.querySelector('#eyeIcon2');

  eyeIcon.addEventListener('click', () => {
    let passwordType = password1.type === 'password' ? 'text' : 'password';
    password1.type = passwordType;
  });
  eyeIcon2.addEventListener('click', () => {
    let passwordType = password2.type === 'password' ? 'text' : 'password';
    password2.type = passwordType;
  });

  // check password
  let changePassBtn = $.querySelector('#changePassBtn');
  changePassBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (password1.value === password2.value) {
      user.password = password1.value;
      postData(user);
      changeValuesInput(user);
      modalsContainer.innerHTML = '';
    }
  });

  closeModal();
}
function deleteAccount() {
  modalsContainer.innerHTML = '';

  modalsContainer.insertAdjacentHTML(
    'beforeend',
    `<div>
        <div class="modal">
          <div class="modal-container">
            <div class="modal-close">
              <button
                aria-label="close"
                class="drawers-close-btn"
                type="button"
              >
                <i class="drawers-close-icon" aria-label="close"></i>
              </button>
            </div>
            <div class="modal-wrapper">
            <h3 class="modal-title">حذف حساب کاربری</h3>
          <p class="modal-context">
          آیا از حذف حساب کاربری خود مطمئن هستید؟
          </p>
  
          <form>
            <div class="modal-form profile-modal-form">
              <label>
              <span> <span>رمز عبور</span> </span>
                    <div class="profile-input-div">
                      <input
                        type="text"
                        name="passDeleteAccount"
                        id="userPass"
                        value=""
                        class="profile-modal-input"
                      />
                    </div>
              </label>
            </div>
            <button
            style="background-color: red;color: white;"
              id="deleteAccount"
              class="modal-form-btn profile-modal-btn"
              name="deleteAccountBtn"
            >
              ذخیره
            </button>
          </form>
            </div>
          </div>
        </div>
      </div>`,
  );
  let deleteAccountBtn = $.querySelector('#deleteAccount');
  deleteAccountBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (user.password === $.querySelector('#userPass').value) {
      fetch(`https://659d09af633f9aee790872ee.mockapi.io/users/${user.id}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
      }).then((res) => {
        if (res.status == 200) {
          setCookie('user', '', -1);
          window.location.href = '/index.html';
        }
      });
    }
  });

  closeModal();
}

function postData(data) {
  console.log(data);
  fetch(`https://659d09af633f9aee790872ee.mockapi.io/users/${data.id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    // Send your data in the request body as JSON
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res);
      if (res.status == 201) {
      }
    })
    .catch((err) => {
      console.log('Error : ' + err);
    });
}

export {
  editeNameModal,
  editeNumberModal,
  editeNumberModal2,
  editeEmail,
  editeGender,
  editeAboutYourSelf,
  editeNationalCode,
  changePass,
  deleteAccount,
};
