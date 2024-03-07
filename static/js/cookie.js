import { getData } from './modals.js';
document.addEventListener('DOMContentLoaded', function () {
  const userCookie = getCookie('user');

  if (userCookie) {
    getData(userCookie, true);
  }
});

function getCookie(name) {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((row) => row.startsWith(`${name}=`));
  return cookie ? cookie.split('=')[1] : null;
}

function setCookie(name, value, days) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  const cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieString;
}

export { setCookie };
