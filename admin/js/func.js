import { getDataUsers } from './api.js';
const container = document.querySelector('.container');

function dashboardPage() {
  container.innerHTML = ``;

  container.innerHTML = ` <ul class="insights">
    <li>
      <i class="bx bx-calendar-check"></i>
      <span class="info">
        <h3 id="orderLength">0</h3>
        <p>رزرو ها</p>
      </span>
    </li>
    <li>
      <i class="bx bx-show-alt"></i>
      <span class="info">
        <h3>99</h3>
        <p>بازدید سایت</p>
      </span>
    </li>
    <li>
      <i class="bx bx-line-chart"></i>
      <span class="info">
        <h3>99</h3>
        <p>جستجو شده</p>
      </span>
    </li>
    <li>
      <i class="bx bx-dollar-circle"></i>
      <span class="info">
        <h3>$10<bold>B</bold></h3>
        <p>فروش کلی</p>
      </span>
    </li>
  </ul>
  <!-- End of Insights -->
  
  <div class="bottom-data">
    <div class="orders">
      <div class="header">
        <i class="bx bx-receipt"></i>
        <h3>رزرو های اخیر</h3>
        <i class="bx bx-filter"></i>
        <i class="bx bx-search"></i>
      </div>
      <table>
        <thead>
          <tr>
            <th>کاربر</th>
            <th>تاریخ رزرو</th>
            <th>وضیعت</th>
          </tr>
        </thead>
        <tbody class="orders-data">
        </tbody>
      </table>
    </div>
  
    <!-- Reminders -->
    <div class="reminders">
      <div class="header">
        <i class="bx bx-note"></i>
        <h3>یادآورها</h3>
        <i class="bx bx-filter"></i>
        <i class="bx bx-plus"></i>
      </div>
      <ul class="task-list">
        <li class="completed">
          <div class="task-title">
            <i class="bx bx-check-circle"></i>
            <p>Start Our Meeting</p>
          </div>
          <i class="bx bx-dots-vertical-rounded"></i>
        </li>
        <li class="completed">
          <div class="task-title">
            <i class="bx bx-check-circle"></i>
            <p>Analyse Our Site</p>
          </div>
          <i class="bx bx-dots-vertical-rounded"></i>
        </li>
        <li class="not-completed">
          <div class="task-title">
            <i class="bx bx-x-circle"></i>
            <p>Play Footbal</p>
          </div>
          <i class="bx bx-dots-vertical-rounded"></i>
        </li>
      </ul>
    </div>
  
    <!-- End of Reminders-->
  </div>`;

  const ordersContainer = document.querySelector('.orders-data');
  const orderLengthElem = document.querySelector('#orderLength');

  getOrders(ordersContainer, orderLengthElem);
}
function analysePage() {
  container.innerHTML = ``;

  container.innerHTML = `<div class="alert">
    <h4>درحال بتن ریزی... </h4>
  </div>`;
}
function ticketsPage() {
  container.innerHTML = ``;

  container.innerHTML = `<div class="alert">
    <h4>درحال بتن ریزی... </h4>
  </div>`;
}
function settingsPage() {
  container.innerHTML = ``;

  container.innerHTML = `<div class="alert">
    <h4>درحال بتن ریزی... </h4>
  </div>`;
}
function getOrders(container, orderLength) {
  let order = 0;
  getDataUsers().then((users) => {
    users.forEach((user) => {
      if (user.actions.length) {
        user.actions.forEach((item) => {
          addOrderToPage(container, user, item);
          order++;
        });
      }
    });
    orderLength.innerHTML = order;
  });
}
function addOrderToPage(container, user, actions) {
  let randomNum = Math.floor(Math.random() * 45);

  container.insertAdjacentHTML(
    'beforeend',
    `<tr>
    <td>
      <img src="https://i.pravatar.cc/150?img=${randomNum}">
      <p>${user.name + ' ' + user.family}</p>
    </td>
    <td><span style="display: block">${actions.dateEntry}</span><span>${
      actions.dateLeave
    }</span></td>
    <td><span class="status pending">${actions.condition}</span></td>
  </tr>`,
  );
}

export { analysePage, ticketsPage, settingsPage, dashboardPage };
