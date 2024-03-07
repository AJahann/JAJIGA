import { closeMenu, loginSuccessful, isLogin } from './funcs.js';
import { setCookie } from './cookie.js';

const $ = document;
const modalsContainer = $.querySelector('.modals');
const loginSignUpBtn = $.querySelectorAll('.login-signUp');
const body = $.querySelector('body');

loginSignUpBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!isLogin) {
      addModalNumber(e);
    }
  });
});

function addModalNumber(e) {
  modalsContainer.innerHTML = '';

  modalsContainer.insertAdjacentHTML(
    'beforeend',
    `<div>
    <div class="modal">
      <div class="modal-container">
        <div class="modal-close">
          <button aria-label="close" class="drawers-close-btn" type="button">
            <i class="drawers-close-icon" aria-label="close"></i>
          </button>
        </div>
        <div class="modal-wrapper">
          <h2 class="modal-title">ورود / ثبت‌نام</h2>
          <p class="modal-context">
            برای ورود یا ثبت‌نام، شماره همراه خود را وارد کنید
          </p>
  
          <form>
            <div class="modal-form">
              <label for="" class="modal-form-label">
                <div class="modal_label-number">
                  <input id="phoneNumber" maxlength="10" oninput="this.value = this.value.replace(/[^0-9]/g, '');" type="tel" class="modal-form-phone" />
                  <div class="modal-form-countryCode">+98</div>
                  <div class="modal-form-label-name">شماره همراه</div>
                </div>
              </label>
            </div>
            <button id="loginBtn" class="modal-form-btn" name="login">ادامه</button>
          </form>
        </div>
      </div>
    </div>
  </div>`,
  );

  closeModal();
  focusInput();
  closeMenu();
  userInfo();

  body.classList.add('hide-scroll');
}
function addModalPassword(user, number) {
  modalsContainer.innerHTML = '';

  modalsContainer.insertAdjacentHTML(
    'afterbegin',
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
          <div class="modal-user-phone-wrapper">
            <h1 class="modal-user-phone" title="+98${number}">
              98${number}+
            </h1>
            <button class="modal-user-phone-edite" type="button">
              ویرایش
            </button>
          </div>
          <p class="modal-context">لطفا رمز عبور خود را وارد کنید</p>

          <form>
            <div class="modal-form">
              <label for="" class="modal-form-label login">
                <div class="modal_label-number">
                  <input
                    id="password"
                    type="password"
                    class="modal-form-phone"
                    autocomplete="new-password"
                  />
                  <div class="modal-form-eye-password">
                    <i class="icon-eye"></i>
                  </div>
                  <div class="modal-form-label-name">رمز عبور</div>
                </div>
                <div
                class="show-error-password"
                type="error"
                aria-live="polite"
              >
                <span
                  >تلفن همراه و کلمه ی عبور خود را بازبینی نمایید و یا از ورود با کد
                  یکبار مصرف استفاده نمایید</span
                >
              </div>
                </label>
            </div>
            <button id="loginBtn" class="modal-form-btn" name="login">
              ورود
            </button>
            <button id="loginCode" class="modal-form-loginCode" type="button">ورود با کد یکبار مصرف</button>
          </form>
        </div>
      </div>
    </div>
  </div>`,
  );

  let errorPassword = $.querySelector('.show-error-password');
  let password = $.querySelector('#password');
  let showPassword = $.querySelector('.modal-form-eye-password');
  let loginBtn = $.querySelector('#loginBtn');
  let loginCode = $.querySelector('#loginCode');
  let editePhoneBtn = $.querySelector('.modal-user-phone-edite');
  let code;

  editePhoneBtn.addEventListener('click', () => {
    addModalNumber(number);
  });
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (password.value == user.password || code == password.value) {
      loginSuccessful(user);
      setCookie('user', user.phoneNumber, 7);
      alert('ورود با موفقیت انجام شد');
      body.classList.remove('hide-scroll');
    } else {
      errorPassword.style.cssText = 'height: 18px; opacity: 1';
      password.parentElement.style.boxShadow =
        'rgb(255, 0, 0, .4) 0px 0px 0px 1px inset';
    }
  });
  loginCode.addEventListener('click', () => {
    code = randomCodeGenerator(password);
  });
  showPassword.addEventListener('click', () => {
    showPass(password);
  });

  closeModal();
  addActiveClassToLabel();
}
function addModalGetCode(number) {
  modalsContainer.innerHTML = '';

  modalsContainer.insertAdjacentHTML(
    'afterbegin',
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
        <!-- <h2 class="modal-title">ورود / ثبت‌نام</h2> -->
        <div class="modal-user-phone-wrapper">
          <h1 class="modal-user-phone" title="+98${number}">
            98${number}+
          </h1>
          <button class="modal-user-phone-edite" type="button">
            ویرایش
          </button>
        </div>
        <p class="modal-context">
          کد فعالسازی به شماره موبایل شما پیامک شد
        </p>

        <form>
          <div class="modal-form">
            <label
              class="modal-get-code"
              for="inputField-کد فعالسازی را وارد کنید-:r3:"
              ><span class="modal-get-code-title"
                ><span>کد فعالسازی را وارد کنید</span></span
              >
              <div class="modal-get-code-inputs">
                    <input
              id="inputField-کد فعالسازی را وارد کنید-:r3:"
              class="modal-get-code-input"
              type="text"
              placeholder="_ _ _ _ _"
              oninput="this.value = this.value.replace(/[^0-9]/g, '');"
              maxlength="5"
            />
            </div 
            ></label>
          </div>
          <div class="modal-user-receive">
            <div class="modal-user-receive-wrapper">
              <p class="modal_receive-title">کد را دریافت نکردید؟</p>
              <button class="modal_receive-btn" type="button">
                ارسال دوباره کد
              </button>
            </div>
          </div>
          <button id="loginBtn" class="modal-form-btn" name="login">
            ادامه
          </button>
        </form>
      </div>
    </div>
  </div>
</div>`,
  );
  let edite = $.querySelector('.modal-user-phone-edite');
  let inputGetCodeElem = $.querySelector('.modal-get-code-input');
  let receiveBtn = $.querySelector('.modal_receive-btn');
  let formBtn = $.querySelector('#loginBtn');
  let code = randomCodeGenerator(inputGetCodeElem);

  receiveBtn.addEventListener('click', () => {
    code = randomCodeGenerator(inputGetCodeElem);
  });

  edite.addEventListener('click', () => {
    addModalNumber();
  });

  inputGetCodeElem.focus();
  formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('clicked');
    codeMatcher(code, inputGetCodeElem, number);
  });
  inputGetCodeElem.addEventListener('keypress', (e) => {
    codeMatcher(code, inputGetCodeElem, number);
  });

  closeModal();
}
function addModalUserInfo(number) {
  modalsContainer.innerHTML = '';

  modalsContainer.insertAdjacentHTML(
    'afterbegin',
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
              <div class="modal-user-phone-wrapper">
                <h1 class="modal-user-phone" title="+98${number}">
                  98${number}+
                </h1>
                <button class="modal-user-phone-edite" type="button">
                  ویرایش
                </button>
              </div>
              <h2 class="modal-title login">ثبت‌نام</h2>
              <p class="modal-context login">
                لطفا مشخصات صحیح خود را وارد کنید
              </p>

              <form>
    <div class="modal-form">
        <label class="modal-form-label login">
            <div class="modal_label-number">
                <input id="name" type="text" class="modal-form-phone login" />
                <div class="modal-form-label-name">نام</div>
            </div>
        </label>
        <label class="modal-form-label login">
            <div class="modal_label-number">
                <input id="family" type="text" class="modal-form-phone login" />
                <div class="modal-form-label-name">خانوادگی</div>
            </div>
        </label>
        <label for="" class="modal-form-label login">
            <div class="modal_label-number">
                <input id="password" type="password" class="modal-form-phone" autocomplete="new-password" />
                <div class="modal-form-eye-password">
                    <i class="icon-eye"></i>
                </div>
                <div class="modal-form-label-name">رمز عبور</div>
            </div>
        </label>
    </div>
    <button id="loginBtn" class="modal-form-btn" name="login">
        ورود
    </button>
</form>

            </div>
          </div>
        </div>
      </div>`,
  );
  let edite = $.querySelector('.modal-user-phone-edite');
  let name = $.querySelector('#name');
  let family = $.querySelector('#family');
  let password = $.querySelector('#password');
  let showPassword = $.querySelector('.icon-eye');
  let formBtn = $.querySelector('#loginBtn');

  edite.addEventListener('click', () => {
    addModalNumber();
  });
  formBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (isValue(name, family, password)) {
      post(name.value, family.value, number, password.value);
    }
  });
  showPassword.addEventListener('click', () => {
    showPass(password);
  });

  closeModal();
  addActiveClassToLabel();
}
function closeModal() {
  body.classList.add('hide-scroll');

  let closeModal = $.querySelector('.modal-close');
  closeModal.addEventListener('click', () => {
    modalsContainer.innerHTML = '';
    body.classList.remove('hide-scroll');
  });
}
function focusInput() {
  let phoneInput = $.querySelector('#phoneNumber');
  let modalLabelName = $.querySelector('.modal-form-label-name');

  phoneInput.addEventListener('focus', () => {
    modalLabelName.classList.add('active');
  });
  phoneInput.addEventListener('blur', () => {
    modalLabelName.classList.remove('active');
  });
}
function addActiveClassToLabel(labelClassName) {
  const inputs = $.querySelectorAll(`.modal-form-phone`);

  inputs.forEach((input) => {
    input.addEventListener('focus', () => {
      const label = input
        .closest('label')
        .querySelector(`.modal-form-label-name`);
      label.classList.add('active');
    });

    input.addEventListener('blur', () => {
      const label = input
        .closest('label')
        .querySelector(`.modal-form-label-name`);
      label.classList.remove('active');
    });
  });
}
function userInfo() {
  let loginBtn = $.querySelector('#loginBtn');
  let phoneNumberInput = $.querySelector('#phoneNumber');
  let phoneNumberContainer = $.querySelector('.modal_label-number');

  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let phoneNumber = phoneNumberInput.value;

    if (phoneNumber.length === 10 && !isNaN(+phoneNumber)) {
      getData(phoneNumber);
    } else {
      phoneNumberContainer.style.border = '1.5px solid rgb(255, 0, 0, .4)';
    }

    setTimeout(() => {
      phoneNumberContainer.style.border =
        '1px solid rgba(153, 153, 153, 0.493)';
    }, 1000);
  });
}

function getData(phoneNumber, cookie) {
  fetch('https://659d09af633f9aee790872ee.mockapi.io/users', {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      userState(data, phoneNumber, cookie);
    })
    .catch((err) => {
      console.log('Error: ' + err);
    });
}
function post(name, family, phoneNumber, password) {
  let userInformation = {
    name,
    family,
    phoneNumber,
    phoneNumber2: '',
    email: '',
    nationalCode: '',
    gender: '',
    aboutYourself: '',
    password,
  };

  fetch('https://659d09af633f9aee790872ee.mockapi.io/users', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    // Send your data in the request body as JSON
    body: JSON.stringify(userInformation),
  })
    .then((res) => {
      if (res.status == 201) {
        loginSuccessful(userInformation);
        setCookie('user', phoneNumber, 7);
        body.classList.remove('hide-scroll');
      }
    })
    .catch((err) => {
      console.log('Error : ' + err);
    });
}
function userState(users, phoneNumber, cookie) {
  let userExists = false;
  let user = [];
  users.forEach((use) => {
    if (use.phoneNumber === phoneNumber) {
      userExists = true;
      user = use;
    }
  });
  if (cookie && !userExists) {
    console.log('user not exist');
    document.cookie = `user=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    return;
  }
  if (userExists && cookie) {
    loginSuccessful(user);
  } else if (userExists) {
    addModalPassword(user, phoneNumber);
  } else {
    addModalGetCode(phoneNumber);
  }
  // clearInput();
  return userExists;
}

function randomCodeGenerator(input) {
  input.value = '';

  const code = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, '0');
  setTimeout(() => {
    alert(`کد فعالسازی شما ${code}`);
  }, 2000);

  return code;
}
function codeMatcher(code, inputGetCodeElem, number) {
  console.log(inputGetCodeElem.value.length);
  if (inputGetCodeElem.value.length >= 4) {
    setTimeout(() => {
      if (inputGetCodeElem.value == code) {
        addModalUserInfo(number);
      } else {
        console.log('not ok');
        inputGetCodeElem.style.boxShadow =
          'rgb(255, 0, 0, .4) 0px 0px 0px 1px inset';
      }
    }, 1);
  }

  setTimeout(() => {
    inputGetCodeElem.style.boxShadow =
      'rgb(214, 214, 214) 0px 0px 0px 1px inset';
  }, 1000);
}

function isValue(name, family, password) {
  if (
    name.value.length == 0 ||
    family.value.length == 0 ||
    password.value.length == 0
  ) {
    return false;
  } else {
    return true;
  }
}
function showPass(elem) {
  elem.type = elem.type === 'password' ? 'text' : 'password';
}

export { closeModal, getData , addModalNumber };
