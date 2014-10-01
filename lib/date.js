"use strict";
exports.isLeapYear = function(year) {
  return (0 === year % 400) || ((0 === year % 4) && (0 !== year % 100)) || (0 === year);
};
var _daysInMonth = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
exports.daysInMonth = function(month, year) {
  if (month === 1) {
    return exports.isLeapYear(year) ? 29 : 28;
  }
  return _daysInMonth[month];
};
exports.toSqlDate = function(date, withHours) {
  var day = date.getDate(),
      month = date.getMonth();
  var result = date.getFullYear() + '-' + (month < 9 ? '0' : '') + (month + 1) + '-' + (day < 10 ? '0' : '') + day;
  if (withHours === false) {
    return result;
  }
  var hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
  return result + ' ' + ((hours < 10) ? '0' : '') + hours + ((minutes < 10) ? ':0' : ':') + minutes + ((seconds < 10) ? ':0' : ':') + seconds;
};
exports.parseSqlDate = function(date) {
  date = date.split(' ');
  date[0] = date[0].split('-');
  if (date.length === 2) {
    date[1] = date[1].split(':');
    return new Date(date[0][0], date[0][1] - 1, date[0][2], date[1][0], date[1][1], date[1][2]);
  }
  return new Date(date[0][0], date[0][1] - 1, date[0][2]);
};

//# sourceMappingURL=date.js.map