
function convertTimeTo12(dateTime)
{
  var hours = dateTime.getHours() ; // gives the value in 24 hours format
  var AmOrPm = hours >= 12 ? 'PM' : 'AM';
  hours = (hours % 12) || 12;
  var minutes = numberWithLeadingZeros(dateTime.getMinutes()) ;
  hours = numberWithLeadingZeros(hours)

  var finalTime = hours + ":" + minutes + " " + AmOrPm;
  return finalTime
}

function addHours(date, hours)
{
  var dateTime = new Date(date);
  dateTime.setHours(dateTime.getHours() + hours);

  return formatDateTime(dateTime)
}

function addDays(date, days, defaultTime = {"hours": 0, "minutes": 0}) {
  var dateTime = new Date(date);

  dateTime.setDate(dateTime.getDate() + days);

  if (defaultTime.hours !==0) {
    dateTime.setHours(defaultTime.hours)
    dateTime.setMinutes(defaultTime.minutes)
  }

  return formatDateTime(dateTime)
}

function parseTime(dateTime) {
  var dateTime = new Date(dateTime);
  return dateTime.getHours()
}

function parseTimeByMinutes(dateTime) {
  var dateTime = new Date(dateTime);
  return dateTime.getMinutes()
}

function formatDateTime(dateTime) {
  var twelveOclockFormat =  convertTimeTo12(dateTime);

  var monthFormatted = numberWithLeadingZeros(dateTime.getMonth()+1)
  var dateFormatted  = numberWithLeadingZeros(dateTime.getDate())
  var yearFormatted  = dateTime.getFullYear()
  var timeFormatted  = twelveOclockFormat

  // e.g. 03/02/2020 03:10 PM
  return monthFormatted + '/' + dateFormatted + '/' + yearFormatted +' '+ timeFormatted
}


//e.g. 1:3 PM to 01:03 PM
// 3/1/2020 to 03/01/2020
function numberWithLeadingZeros(value) {
  return (value < 10 ? '0' : '') +value;
}

module.exports.convertTimeTo12 = convertTimeTo12;
module.exports.addHours = addHours;
module.exports.parseTime = parseTime;
module.exports.addDays = addDays;
module.exports.parseTimeByMinutes = parseTimeByMinutes;
