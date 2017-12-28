'use strict';

(function(){

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

  function calendarModule() {
    var vm = this;
    var date = new Date();
    var selectedMonth = date.getMonth();
    var selectedYear = date.getFullYear();

    function getCurrentDay() {
      return monthNameLong[selectedMonth] + ' ' + selectedYear;
    }

    function monthNext() {
      if(selectedMonth < 11) {
        selectedMonth++;
      } else {
        selectedMonth = 0;
        selectedYear++;
      }
    }

    function monthPrev() {
      if(selectedMonth > 0) {
        selectedMonth--;
      } else {
        selectedMonth = 11;
        selectedYear--;
      }
    }

    function getSelectedMonth() {
      return selectedMonth;
    }

    return {
      getCurrentDay: getCurrentDay,
      monthNext: monthNext,
      monthPrev: monthPrev,
      getSelectedMonth: getSelectedMonth
    }
  }

  window.calendarModule = calendarModule;
})();
