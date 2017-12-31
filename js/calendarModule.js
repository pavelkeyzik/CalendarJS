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
    return `<div class="calendar">
      <div class="calendar__action">
        <div class="calendar__left js-month__prev" onclick="calendar.monthPrev();">
          <i class="material-icons">chevron_left</i>
        </div>
        <div class="calendar__current js-calendar__current">
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
        <div class="calendar__numbers">
          <div class="row">
            <li class="calendar__numbers--inactive">26</li>
            <li class="calendar__numbers--inactive">27</li>
            <li class="calendar__numbers--inactive">28</li>
            <li class="calendar__numbers--inactive">29</li>
            <li class="calendar__numbers--inactive">30</li>
            <li class="calendar__numbers--active">1</li>
            <li class="calendar__numbers--active">2</li>
          </div>
          <div class="row">
            <li class="calendar__numbers--active">3</li>
            <li class="calendar__numbers--active">4</li>
            <li class="calendar__numbers--active">5</li>
            <li class="calendar__numbers--active">6</li>
            <li class="calendar__numbers--active">7</li>
            <li class="calendar__numbers--active">8</li>
            <li class="calendar__numbers--active">9</li>
          </div>
          <div class="row">
            <li class="calendar__numbers--active">10</li>
            <li class="calendar__numbers--active">11</li>
            <li class="calendar__numbers--active">12</li>
            <li class="calendar__numbers--active">13</li>
            <li class="calendar__numbers--active">14</li>
            <li class="calendar__numbers--active">15</li>
            <li class="calendar__numbers--active">16</li>
          </div>
          <div class="row">
            <li class="calendar__numbers--active">17</li>
            <li class="calendar__numbers--active">18</li>
            <li class="calendar__numbers--active">19</li>
            <li class="calendar__numbers--active">20</li>
            <li class="calendar__numbers--active">21</li>
            <li class="calendar__numbers--active">22</li>
            <li class="calendar__numbers--active">23</li>
          </div>
          <div class="row">
            <li class="calendar__numbers--active">24</li>
            <li class="calendar__numbers--active">25</li>
            <li class="calendar__numbers--active">26</li>
            <li class="calendar__numbers--active">27</li>
            <li class="calendar__numbers--active">28</li>
            <li class="calendar__numbers--active">29</li>
            <li class="calendar__numbers--active">30</li>
          </div>
          <div class="row">
            <li class="calendar__numbers--active">31</li>
            <li class="calendar__numbers--inactive">1</li>
            <li class="calendar__numbers--inactive">2</li>
            <li class="calendar__numbers--inactive">3</li>
            <li class="calendar__numbers--inactive">4</li>
            <li class="calendar__numbers--inactive">5</li>
            <li class="calendar__numbers--inactive">6</li>
          </div>
        </div>
      </div>
    </div>`;
  }

  this_.updateTemplate();
}
