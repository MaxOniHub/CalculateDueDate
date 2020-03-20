const inRange = require('in-range');


class DueDate
{

  _startWorkAtDay = 1; // from Monday
  _endWorkAtDay = 5; // till Friday

  constructor(date, turnaroundTime) {
     this._date = date
     this._turnaroundTime = turnaroundTime
     this._startWorkAtHours = 9;
     this._endWorkAtHours = 17;
  }

  workingDay() {
    return this._endWorkAtHours - this._startWorkAtHours
  }

  get startWorkAtHours() {
    return this._startWorkAtHours
  }

  set startWorkAtHours(value) {
    this._startWorkAtHours = value
  }

  get endWorkAtHours() {
    return this._endWorkAtHours
  }

  set endWorkAtHours(value) {
    this._endWorkAtHours = value
  }

  get date()
  {
    return this._date
  }

  set date(value) {
    this._date = value
  }

  get turnaroundTime() {
    return this._turnaroundTime
  }

  set turnaroundTime(value) {
      this._turnaroundTime = value
  }

  isWorkingHours() {
    const date = new Date(this.date)
    var hours = date.getHours()
    var minutes = date.getMinutes();

    if (hours == this._endWorkAtHours && minutes >= 0) {
      return false;
    }

    return inRange(hours, {start: this._startWorkAtHours, end: this._endWorkAtHours})

  }

  isHoliday() {
      const date = new Date(this.date)
      var weekday = date.getDay()
      var isWorkingDay = inRange(weekday, {start: this._startWorkAtDay, end: this._endWorkAtDay})

      return !isWorkingDay
  }

}

module.exports = DueDate
