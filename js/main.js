'use strict';

(function() {
  // -> Start Loading modules

  var calendar = window.calendarModule();

  // <- End Loading modules

  var currentLayout = document.getElementsByClassName('js-calendar__current')[0];
  currentLayout.innerText = calendar.getCurrentDay();

  var prevMonth = document.getElementsByClassName('js-month__prev')[0];
  var nextMonth = document.getElementsByClassName('js-month__next')[0];

  prevMonth.addEventListener('click', function() {
    calendar.monthPrev();
    currentLayout.innerText = calendar.getCurrentDay();
  });

  nextMonth.addEventListener('click', function() {
    calendar.monthNext();
    currentLayout.innerText = calendar.getCurrentDay();
  });


})();
