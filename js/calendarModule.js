'use strict';

(function(){

  var monthNameShortEn = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'June',
    'July', 'Aug', 'Sept',
    'Oct', 'Nov', 'Dec'
  ];

  var monthNameShortRu = [
    'Янв', 'Фев', 'Мар',
    'Апр', 'Май', 'Июн',
    'Июл', 'Авг', 'Сен',
    'Окт', 'Ноя', 'Дек'
  ];

  var monthNameLongEn = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December'
  ];

  var monthNameLongRu = [
    'Январь', 'Февраль', 'Март',
    'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь',
    'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  var daysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var daysRu = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  var object = document.getElementsByClassName('calendar-widjet');
  var i = 0;

  for (let calendar of object) {
    calendar.id = 'calendar-' + i;
    var type = 'short', lang = 'en';

    if(calendar.dataset.type == 'long' || calendar.dataset.type == 'short') {
        type = calendar.dataset.type;
    }

    if(calendar.dataset.lang == 'ru' || calendar.dataset.lang == 'en') {
        lang = calendar.dataset.lang;
    }

    new Calendar(calendar.id, type, lang);
    i++;
  };

  function Calendar(id, type, lang) {
    var this_  = this;

    if(lang == 'en') this_.days = daysEn;
    else if(lang == 'ru') this_.days = daysRu;

    if(type == 'short' && lang == 'en') this_.monthName = monthNameShortEn;
    else if(type == 'short' && lang == 'ru') this_.monthName = monthNameShortRu;
    else if(type == 'long' && lang == 'en') this_.monthName = monthNameLongEn;
    else if(type == 'long' && lang == 'ru') this_.monthName = monthNameLongRu;

    var date = new Date();
    this_.currentDay = date.getDate();
    this_.currentYear = date.getFullYear();
    this_.currentMonth = date.getMonth();

    this_.selectedMonth = date.getMonth();
    this_.selectedYear = date.getFullYear();

    this.getCurrentDay = function() {
      return this_.monthName[this_.selectedMonth] + ' ' + this_.selectedYear;
    }

    this.monthPrev = function() {
      if(this_.selectedMonth > 0) {
        this_.selectedMonth--;
      } else {
        this_.selectedMonth = 11;
        this_.selectedYear--;
      }
      this_.updateTemplate();
    }

    this.monthNext = function() {
      if(this_.selectedMonth < 11) {
        this_.selectedMonth++;
      } else {
        this_.selectedMonth = 0;
        this_.selectedYear++;
      }
      this_.updateTemplate();
    }

    this_.updateTemplate = function() {
      document.getElementById(id).innerHTML = this_.getTemplate();
    }

    document.getElementById(id).addEventListener('click', function(event) {
      var calendarId = event.target.parentNode.parentNode.id;
      if(id == calendarId) {
        if(event.target.className.indexOf('js-month__prev') > 0) {
          this_.monthPrev();
        } else if (event.target.className.indexOf('js-month__next') > 0) {
          this_.monthNext();
        } else if (event.target.className.indexOf('js-calendar__current') > 0) {
          this_.refreshDate();
        }
      }
    });

    this_.getTemplate = function() {
      var templateStart = `<div class="calendar" id="${id}">
        <div class="calendar__action">
          <i class="material-icons calendar__left js-month__prev">chevron_left</i>
          <div class="calendar__current js-calendar__current">
            ${this.getCurrentDay()}
          </div>
          <i class="material-icons calendar__right js-month__next">
            chevron_right
          </i>
        </div>
        <div class="calendar__content">
          <ul class="calendar__days">`;

      for(var i = 0; i < 7; i++) {
        templateStart += `<li>${this_.days[i]}</li>`
      }

      templateStart += `</ul>
        <div class="calendar__numbers">`;

      var templateEnd = `
          </div>
        </div>
      </div>`;

      var template = templateStart;
      var k = 1;

      template += `<div class="row">`;

      var countOfDaysInMounth = new Date(this_.selectedYear, this_.selectedMonth + 1, 0).getDate();

      var start = new Date(this_.selectedYear, this_.selectedMonth, 1).getDay();

      var prevMonthStart = new Date(this_.selectedYear, this_.selectedMonth, 0).getDate();
      prevMonthStart -= start - 1;

      for(var i = 0; i < start; i++) {
        template += `<li class="calendar__numbers--inactive">${prevMonthStart}</li>`;
        prevMonthStart++;
      }
      for(var i = 0; i < 7 - start; i++) {
        if(k != this_.currentDay) template += `<li class="calendar__numbers--active">${k}</li>`;
        else if(k == this_.currentDay && this_.currentYear == this_.selectedYear && this_.currentMonth == this_.selectedMonth) template += `<li class="calendar__numbers--current">${k}</li>`;
        else template += `<li class="calendar__numbers--active">${k}</li>`;
        k++;
      }
      template += `</div>`;

      var l = 1;
      var end = new Date(this_.selectedYear, this_.selectedMonth + 1, 0).getDay();
      for(var i = 0; i < Math.floor((countOfDaysInMounth + start) / 7); i++) {
        template += `<div class="row">`;
        for(var j = 0; j < 7; j++) {
          if(k <= countOfDaysInMounth) {
            if(k != this_.currentDay) template += `<li class="calendar__numbers--active">${k}</li>`;
            else if(k == this_.currentDay && this_.currentYear == this_.selectedYear && this_.currentMonth == this_.selectedMonth) template += `<li class="calendar__numbers--current">${k}</li>`;
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
      this_.selectedMonth = this_.currentMonth;
      this_.selectedYear = this_.currentYear;
      this_.updateTemplate();
    }

    this_.updateTemplate();
  }

})();
