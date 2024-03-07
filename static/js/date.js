const $ = document;
const container = $.querySelector('#datePicker');
const persianMonths = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

function addDatePickerTemplate(f) {
  container.innerHTML = `<div class="modal">
  <div class="modal-container">
    <div class="date-picker">
      <div class="date-picker-from">
        <div class="date-picker-year">
          <button class="date-picker-year-prev" ${f || 'style="opacity: .5"' } type="button">
            <i class="icon_arrow-head-right-rounded"></i>
          </button>
          <p id="datePickerYearMonth">اسفند 1402</p>
          <button class="date-picker-year-next" type="button">
            <i class="icon_arrow-head-left-rounded"></i>
          </button>
        </div>

        <div class="date-picker-days">
          <div class="date-picker-week">
            <span class="date-picker-weekName">ش</span>
          </div>
          <div class="date-picker-week">
            <span class="date-picker-weekName">ی</span>
          </div>
          <div class="date-picker-week">
            <span class="date-picker-weekName">د</span>
          </div>
          <div class="date-picker-week">
            <span class="date-picker-weekName">س</span>
          </div>
          <div class="date-picker-week">
            <span class="date-picker-weekName">چ</span>
          </div>
          <div class="date-picker-week">
            <span class="date-picker-weekName">پ</span>
          </div>
          <div class="date-picker-week">
            <span class="date-picker-weekName">ج</span>
          </div>
        </div>
      </div>
      <div class="date-picker-to"></div>
    </div>
  </div>
</div>`;
}
export function drawCalendar(data , from) {
  addDatePickerTemplate(from);

  let datePickerWeeks = $.querySelectorAll('.date-picker-week');
  let currentDate = new persianDate();
  let currentMonth = currentDate.month();
  let currentYear = currentDate.year();
  let today = currentDate.date();

  // نمایش ماه و سال فعلی
  datePickerYearMonth.innerHTML = `${
    persianMonths[currentMonth - 1]
  } ${currentYear}`;

  let firstDayOfMonth = new persianDate([currentYear, currentMonth, 1]);
  let daysInMonth = firstDayOfMonth.daysInMonth();
  let firstDayOfWeek = firstDayOfMonth.day();

  for (let i = 1; i < firstDayOfWeek; i++) {
    datePickerWeeks[i - 1].insertAdjacentHTML(
      'beforeend',
      `<div style="opacity: .5"></div>`,
    );
  }

  let currentDay = 1;
  while (currentDay <= daysInMonth) {
    if (firstDayOfWeek % 8 === 0) {
      firstDayOfWeek = 1;
    }
    if (currentDay < convertNumber(String(today))) {
      datePickerWeeks[firstDayOfWeek - 1].insertAdjacentHTML(
        'beforeend',
        `<div class="date-day-wrapper yesterday">
          <span class="date-picker-day">${currentDay}</span>
          <span class="date-picker-price">${data.price}</span>
        </div>`,
      );
    } else if (convertNumber(String(today)) == currentDay) {
      datePickerWeeks[firstDayOfWeek - 1].insertAdjacentHTML(
        'beforeend',
        `<div class="date-day-wrapper today">
          <span class="date-picker-day">${currentDay}</span>
          <span class="date-picker-price">${data.price}</span>
        </div>`,
      );
    } else {
      datePickerWeeks[firstDayOfWeek - 1].insertAdjacentHTML(
        'beforeend',
        `<div class="date-day-wrapper">
            <span class="date-picker-day">${currentDay}</span>
            <span class="date-picker-price">${data.price}</span>
            </div>`,
      );
    }
    currentDay++;
    firstDayOfWeek++;
  }
}

function convertNumber(string) {
  let result = '';
  for (let i = 0; i < string.length; i++) {
    const charCode = string.charCodeAt(i);
    if (charCode >= 1632 && charCode <= 1726) {
      result += charCode - 1632;
    } else if (charCode >= 1776 && charCode <= 1785) {
      result += charCode - 1776;
    } else {
      result += string.charAt(i);
    }
  }
  return Number(result);
}
