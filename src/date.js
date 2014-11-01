/**
 * @module date
 */

/**
 * Returns if the year in parameter is a leap year
 *
 * @param {Number} year
 * @return {Boolean}
 */
exports.isLeapYear = function(year) {
    return (year % 400) === 0 || ((year % 4) === 0 && (year % 100) !== 0) || year === 0;
};

var _daysInMonth = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
/**
 * Returns the number of days in the month and year in parameters
 *
 * @param {Number} month from 0 to 11
 * @param {Number} year
 * @return {Number} 28, 29, 30 or 31
 */
exports.daysInMonth = function(month, year) {
    if (month === 1) {
        return exports.isLeapYear(year) ? 29 : 28;
    }
    return _daysInMonth[month];
};

/**
 * Transform a date into a SQL date : YYYY-MM-DD HH:MM:SS
 *
 * @param {Date} date
 * @param {Boolean} withHours
 * @return {String} string date with format YYYY-MM-DD HH:MM:SS
 */
exports.toSqlDate = function(date, withHours) {
    var day = date.getDate(), month = date.getMonth();
    var result = date.getFullYear() + '-' + (month < 9 ? '0' : '') + (month + 1) + '-' + (day < 10 ? '0' : '') + day;
    if (withHours === false) {
        return result;
    }
    var hours = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds();
    return result + ' ' + ((hours < 10) ? '0' : '') + hours
                  + ((minutes < 10) ? ':0' : ':') + minutes
                  + ((seconds < 10) ? ':0' : ':') + seconds;
};


/**
 * Transform a SQL string date into a Date
 *
 * @param {String} sqlDate
 * @return {Date} date
 */
exports.parseSqlDate = function(date) {
    date = date.split(' ');
    date[0] = date[0].split('-');
    if (date.length === 2) {
        date[1] = date[1].split(':');
        return new Date(date[0][0], date[0][1] - 1, date[0][2], date[1][0], date[1][1], date[1][2]);
    }
    return new Date(date[0][0], date[0][1] - 1, date[0][2]);
};
