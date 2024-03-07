import { residencePage } from './residence.js';
import {
  analysePage,
  ticketsPage,
  settingsPage,
  dashboardPage,
} from './func.js';
import { usersPage } from './user.js';

const $ = document;
const sideBar = $.querySelector('.side-menu');

Array.from(sideBar.children).forEach((e) => {
  e.addEventListener('click', (e) => {
    let elem = e.target;
    elem.parentElement.classList.add('active');

    if (e.target.tagName == 'I') {
      elem = e.target.parentElement;
    }
    switch (elem.name) {
      case 'dashboard':
        dashboardPage();
        break;
      case 'residences':
        residencePage();
        break;
      case 'analyse':
        analysePage();
        break;
      case 'tickets':
        ticketsPage();
        break;
      case 'users':
        usersPage();
        break;
      case 'setting':
        settingsPage();
        break;
      default:
        console.error(`Function ${e.target.name} is not defined`);
    }
  });
});

dashboardPage();
