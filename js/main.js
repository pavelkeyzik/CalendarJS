'use strict';

(function() {
  // -> Start Loading modules

  var calendar = window.calendarModule();

  // <- End Loading modules

  var currentDate = calendar.getCurrentDay();

  var currentLayout = document.getElementsByClassName('js-calendar__current')[0];
  currentLayout.innerText = currentDate;
})();
