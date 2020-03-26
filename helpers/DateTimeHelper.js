
function convertTimeTo12(dateTime) {
  let hours = dateTime.getHours(); // gives the value in 24 hours format
  let AmOrPm = hours >= 12 ? 'PM' : 'AM';

  hours = (hours % 12) || 12;

  let minutes = numberWithLeadingZeros(dateTime.getMinutes());

  hours = numberWithLeadingZeros(hours);
  let finalTime = hours + ":" + minutes + " " + AmOrPm;

  return finalTime;
}

function addHours(date, hours) {
  const dateTime = new Date(date);
  dateTime.setHours(dateTime.getHours() + hours);

  return formatDateTime(dateTime);
}

function addDays(date, days, defaultTime = {"hours": 0, "minutes": 0}) {
  const dateTime = new Date(date);

  dateTime.setDate(dateTime.getDate() + days);

  if (defaultTime.hours !== 0) {
    dateTime.setHours(defaultTime.hours);
    dateTime.setMinutes(defaultTime.minutes);
  }

  return formatDateTime(dateTime);
}

function parseTime(dateTime) {
  const _dateTime = new Date(dateTime);

  return _dateTime.getHours();
}

function parseTimeByMinutes(dateTime) {
  const _dateTime = new Date(dateTime);

  return _dateTime.getMinutes();
}

function formatDateTime(dateTime) {
  let twelveOclockFormat =  convertTimeTo12(dateTime);

  let monthFormatted = numberWithLeadingZeros(dateTime.getMonth()+1);
  let dateFormatted  = numberWithLeadingZeros(dateTime.getDate());
  let yearFormatted  = dateTime.getFullYear();
  let timeFormatted  = twelveOclockFormat;

  // e.g. 03/02/2020 03:10 PM
  return monthFormatted + '/' + dateFormatted + '/' + yearFormatted +' '+ timeFormatted;
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
