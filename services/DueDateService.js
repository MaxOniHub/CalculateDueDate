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

      dueDate.turnaroundTime += this._getWorkingHoursOffer(dueDate)

      return  dateTimeConverter.addHours(dueDate.date, dueDate.turnaroundTime)

  }

  _getWorkingHoursOffer(dueDate) {

    var hoursToResolve = dueDate.turnaroundTime

    if (this._hoursTillWorksDayEnds(dueDate) < dueDate.turnaroundTime) {

        hoursToResolve -= dueDate.workingDay()

        if (hoursToResolve < dueDate.workingDay()) {
          return 24 - dueDate.workingDay();
        }
        return math.ceil((hoursToResolve / dueDate.workingDay())) * 24 + dueDate.workingDay()
    }

    if (this._hoursTillWorksDayEnds(dueDate) == 1) {
        return 24 - dueDate.workingDay();
    }
  
    return 0

  }

  _hoursTillWorksDayEnds(dueDate) {
      var endWorkDayHours = dueDate.endWorkAtHours
      var currentTime = dateTimeConverter.parseTime(dueDate.date)

      if (currentTime < endWorkDayHours) {
        return endWorkDayHours - currentTime
      }
      return 0
  }

}


module.exports = DueDateService
