'use strict';

var monthNameShort = [
  'Jan', 'Feb', 'Mar',
  'Apr', 'May', 'June',
  'July', 'Aug', 'Sept',
  'Oct', 'Nov', 'Dec'
];

var monthNameLong = [
  'January', 'February', 'March',
  'April', 'May', 'June',
  'July', 'August', 'September',
  'October', 'November', 'December'
];

function Calendar(id, type) {
  var this_  = this;

  if(type == 'short') this_.monthName = monthNameShort;
  else if(type == 'long') this_.monthName = monthNameLong;

  var date = new Date();
  var currentDay = date.getDate();
  var currentYear = date.getFullYear();
  var currentMonth = date.getMonth();

  var selectedMonth = date.getMonth();
  var selectedYear = date.getFullYear();

  this.getCurrentDay = function() {
    return this_.monthName[selectedMonth] + ' ' + selectedYear;
  }

  this.calendarPromise = new Promise(function(resolve, reject) {
    resolve(this_.getCurrentDay());
  });

  this.monthPrev = function() {
    if(selectedMonth > 0) {
      selectedMonth--;
    } else {
      selectedMonth = 11;
      selectedYear--;
    }
    this_.updateTemplate();
  }

  this.monthNext = function() {
    if(selectedMonth < 11) {
      selectedMonth++;
    } else {
      selectedMonth = 0;
      selectedYear++;
    }
    this_.updateTemplate();
  }

  this_.updateTemplate = function() {
    document.getElementById(id).innerHTML = this_.getTemplate();
  }

  this_.getTemplate = function() {
    var templateStart = `<div class="calendar">
      <div class="calendar__action">
        <div class="calendar__left js-month__prev" onclick="calendar.monthPrev();">
          <i class="material-icons">chevron_left</i>
        </div>
        <div class="calendar__current js-calendar__current" onclick="calendar.refreshDate();">
          ${this.getCurrentDay()}
        </div>
        <div class="calendar__right js-month__next" onclick="calendar.monthNext();">
          <i class="material-icons">chevron_right</i>
        </div>
      </div>
      <div class="calendar__content">
        <ul class="calendar__days">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <div class="calendar__numbers">`;

    var templateEnd = `
        </div>
      </div>
    </div>`;

    var template = templateStart;
    var k = 1;

    template += `<div class="row">`;

    var countOfDaysInMounth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    var start = new Date(selectedYear, selectedMonth, 1).getDay();

    var prevMonthStart = new Date(selectedYear, selectedMonth, 0).getDate();
    prevMonthStart -= start - 1;

    for(var i = 0; i < start; i++) {
      template += `<li class="calendar__numbers--inactive">${prevMonthStart}</li>`;
      prevMonthStart++;
    }
    for(var i = 0; i < 7 - start; i++) {
      template += `<li class="calendar__numbers--active">${k}</li>`;
      k++;
    }
    template += `</div>`;

    var l = 1;
    var end = new Date(selectedYear, selectedMonth + 1, 0).getDay();
    for(var i = 0; i < Math.floor((countOfDaysInMounth + start) / 7); i++) {
      template += `<div class="row">`;
      for(var j = 0; j < 7; j++) {
        if(k <= countOfDaysInMounth) {
          if(k != currentDay) template += `<li class="calendar__numbers--active">${k}</li>`;
          else if(k == currentDay && currentYear == selectedYear && currentMonth == selectedMonth) template += `<li class="calendar__numbers--current">${k}</li>`;
          else template += `<li class="calendar__numbers--active">${k}</li>`;
          k++;
        } else {
          if(end != 6) {
            template += `<li class="calendar__numbers--inactive">${l}</li>`;
            l++;
          }
        }
      }
      template += `</div>`;
    }

    template += templateEnd;

    return template;
  }

  this_.refreshDate = function() {
    selectedMonth = currentMonth;
    selectedYear = currentYear;
    this_.updateTemplate();
  }

  this_.updateTemplate();
}
