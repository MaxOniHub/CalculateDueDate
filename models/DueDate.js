const inRange = require('in-range');


class DueDate
{

  constructor(date, turnaroundTime) {
     this.date = date
     this.turnaroundTime = turnaroundTime
     this.startWorkAt = '9';
     this.endWorkAt = '17'
  }

  getStartWorkAt() {
    return  parseInt(this.startWorkAt)
  }

  getEndWorkAt() {
     return parseInt(this.endWorkAt)
  }

  isWorkingHours() {
    const date = new Date(this.date)
    var hours = date.getHours()

    return inRange(hours, {start: this.getStartWorkAt(), end: this.getEndWorkAt()})
  }

  isHoliday() {

  }

}

module.exports = DueDate
