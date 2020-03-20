const dateTimeConverter = require('../helpers/DateTimeHelper')
const math = require("mathjs")

class DueDateService {

  calculateDueDate(dueDate) {
      if (!dueDate.isWorkingHours()) {
        throw new Error('Sorry the working day is over')
      }

      if (dueDate.isHoliday()) {
        throw new Error('Sorry but see you on Monday!')
      }

     return this._addHours(dueDate)
  }

  _addHours(dueDate) {
    if (dueDate.turnaroundTime > this._hoursTillWorksDayEnds(dueDate.date, dueDate.endWorkAtHours))  {
        return this._handleMultiDays(dueDate)
    } else {
        return this._handleSingleDay(dueDate)
    }
    return 0
  }

  _handleSingleDay(dueDate) {
      var workingDays = parseInt((dueDate.turnaroundTime / dueDate.workingDay()))
      var leftHours = dueDate.turnaroundTime / dueDate.workingDay() - workingDays;
      var hoursToEnd = this._hoursTillWorksDayEnds(dueDate.date, dueDate.endWorkAtHours)

      console.log("Hours to End"+hoursToEnd +" " + leftHours *  dueDate.workingDay() + " " + workingDays)
      if (hoursToEnd > leftHours *  dueDate.workingDay())
      {
          return dateTimeConverter.addHours(dueDate.date, dueDate.turnaroundTime)
      }
      return this._handleMultiDays(dueDate)
  }

  _handleMultiDays(dueDate) {
    var hoursToResolve = dueDate.turnaroundTime
    var multiplier = 24
    var tempDate = dueDate.date
    var workingDays = parseInt((dueDate.turnaroundTime / dueDate.workingDay()))
    var leftHours = dueDate.turnaroundTime / dueDate.workingDay() - workingDays;
    console.log(workingDays, "Left" + leftHours)

    var workingDaysInHours = workingDays * dueDate.workingDay()

    if (workingDays == 0 && leftHours >= 0) {
        workingDaysInHours = leftHours * dueDate.workingDay();
        workingDays = 1;
    }

    var date = dueDate.date;

    for (var i=0; i < workingDays; ++i) {
        var hours = this._hoursTillWorksDayEnds(date, dueDate.endWorkAtHours)
        console.log( hours)

          for (var j=1; j < hours+1; ++j) {

                date = dateTimeConverter.addHours(date, 1)
                workingDaysInHours--;
                console.log(date)
          }
          date = dateTimeConverter.addDays(date, 1, {"hours": dueDate.startWorkAtHours, "minutes": dateTimeConverter.parseTimeByMinutes(date)})
        console.log(date)
      }
      console.log("Working days in hours " +workingDaysInHours)

      if (workingDaysInHours === 0) {
          workingDaysInHours = leftHours * dueDate.workingDay()
      }
       date = dateTimeConverter.addHours(date, workingDaysInHours)

        return date
  }

  _hoursTillWorksDayEnds(date, workEndAt) {

      var currentTime = dateTimeConverter.parseTime(date)

      if (currentTime < workEndAt) {
        return workEndAt - currentTime
      }
      return 0
  }

}


module.exports = DueDateService
