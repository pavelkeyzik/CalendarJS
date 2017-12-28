'use strict';
(function(){

  function calendarModule() {

    function getCurrentDay() {
      var date = new Date();

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

      return monthNameLong[date.getMonth()] + ' ' + date.getFullYear();
    }

    return {
      getCurrentDay: getCurrentDay
    }
  }

  window.calendarModule = calendarModule;
})();
