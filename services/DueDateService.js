const dateTimeConverter = require('../helpers/DateTimeHelper')
const DueDate = require('../models/DueDate')
const math = require("mathjs")

class DueDateService {

  calculateDueDate(dueDate) {
      if (!dueDate.isWorkingHours()) {
        throw new Error('Sorry the working day is over');
      }

      if (dueDate.isHoliday()) {
        throw new Error('Sorry but see you on Monday!');
      }

     return this._addHours(dueDate);
  }

    // handle main logic
  _addHours(dueDate) {
    if (dueDate.turnaroundTime > this._hoursTillWorksDayEnds(dueDate.date, dueDate.endWorkAtHours))  {
        return this._handleMultiDays(dueDate);
    } else {
        return this._handleSingleDay(dueDate);
    }
  }

  // Single day case
  _handleSingleDay(dueDate) {
      let workingDays = parseInt((dueDate.turnaroundTime / dueDate.workingDay()));
      let leftHours = (dueDate.turnaroundTime / dueDate.workingDay() - workingDays) * dueDate.workingDay();
      let hoursToEnd = this._hoursTillWorksDayEnds(dueDate.date, dueDate.endWorkAtHours);

      if (hoursToEnd >= leftHours) {
          return dateTimeConverter.addHours(dueDate.date, dueDate.turnaroundTime);
      }

      return this._handleMultiDays(dueDate);
  }

  // Multi days case
  _handleMultiDays(dueDate) {
    let hoursToResolve = dueDate.turnaroundTime;
    let workingDays = parseInt((dueDate.turnaroundTime / dueDate.workingDay()));
    let leftHours = dueDate.turnaroundTime / dueDate.workingDay() - workingDays;
    let workingDaysInHours = (workingDays + leftHours) * dueDate.workingDay();
    let date = dueDate.date;

    if (workingDays === 0 && leftHours >= 0) {
        workingDays = 1;
    }

    for (let i = 0; i < workingDays; ++i) {
        let hours = this._hoursTillWorksDayEnds(date, dueDate.endWorkAtHours);

          for (let j = 1; j < hours+1; ++j) {
                date = dateTimeConverter.addHours(date, 1);
                workingDaysInHours--;
          }

          if (workingDaysInHours > 0) {
            // take next working day skipping holidays
            date = this._getNextDate(date, dueDate.startWorkAtHours, dateTimeConverter.parseTimeByMinutes(date));
          }
      }

      if (workingDaysInHours === 0) {
          workingDaysInHours = leftHours * dueDate.workingDay();
      }

      date = dateTimeConverter.addHours(date, workingDaysInHours);

      return date;
  }

  _hoursTillWorksDayEnds(date, workEndAt) {
      let currentTime = dateTimeConverter.parseTime(date);

      if (currentTime < workEndAt) {
        return workEndAt - currentTime;
      }

      // return default value
      return 0;
  }

  _getNextDate(date, predefinedHours, predefinedMinutes) {
     date = dateTimeConverter.addDays(date, 1, {"hours": predefinedHours, "minutes": predefinedMinutes});

     const model = new DueDate(date, 1);

     if (model.isHoliday()) {
       return this._getNextDate(date, predefinedHours, predefinedMinutes);
     } else {
       return date;
     }
  }

}

module.exports = DueDateService;
