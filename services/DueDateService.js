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


    return this.addHours(dueDate)

  }

  addHours(dueDate) {
    var hoursToResolve = dueDate.turnaroundTime
    var multiplier = 24
    var tempDate = dueDate.date

    if (dueDate.turnaroundTime > this._hoursTillWorksDayEnds(dueDate.date, dueDate.endWorkAtHours))  {
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
    } else {
      return dateTimeConverter.addHours(dueDate.date, dueDate.turnaroundTime)
    }

    return 0
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
