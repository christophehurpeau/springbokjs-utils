'use strict';
var S = require('./index.js');

var dateUtils = S.newLibrary();
module.exports = dateUtils;

dateUtils.defineProperties({
    daysInMonth: function(month, year) {
        return [31, (dateUtils.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },
    isLeapYear: function(year) {
        return (0 === year % 400) || ((0 === year % 4) && (0 !== year % 100)) || (0 === year);
    },
    toSqlDate: function(date, withoutHours) {
        var day=date.getDate(),month=date.getMonth(),
            str=date.getFullYear()+'-'+(day<10?'0':'')+day+'-'+ (month<9?'0':'')+(month+1);
        if(withoutHours) return str;
        var hours = date.getHours(), minutes = date.getMinutes(),seconds=date.getSeconds();
        return str+' '+((hours < 10)?"0":"")+hours +((minutes < 10)?":0":":") + minutes +((seconds < 10)?":0":":") + seconds;
    },
    parseSqlDate: function(date) {
        date = date.split(' ');
        date[0] = date[0].split('-')
        if(date.length === 2){
            date[1] = date[1].split(':');
            return new Date(date[0][0], date[0][1]-1, date[0][2], date[1][0], date[1][1]);
        }
        return new Date(date[0][0], date[0][1]-1, date[0][2]);
    },
    parseDate: function(date) {
        if(!date) {
            return new Date();
        }
        //if(S.isString(date)) return dateUtils.parseSqlDate(date);
        if(S.isNumber(date)) {
            return new Date(date);
        }
        return date;
    },
    Calendar: S.newClass({
        construct: function(date) {
            this.setDate(date);
        },
        setDate: function(date) {
            this.date = date;
            this.lastDayOfThisMonth = dateUtils.daysInMonth(this.date.getMonth(), this.date.getFullYear());
        },
        next: function() {
            if (this.date.getDate() === this.lastDayOfThisMonth) {
                this.date.setDate(1);
                this.date.setMonth(this.date.getMonth() + 1);
                this.setDate(this.date);
            } else {
                this.date.setDate(this.date.getDate() +1);
            }
            return this.date;
        },
        previous: function() {
            if (this.date.getDate() === 1) {
                this.date.setMonth(this.date.getMonth() - 1);
                this.setDate(this.date);
                this.date.setDate(this.lastDayOfThisMonth);
            } else {
                this.date.setDate(this.date.getDate() -1);
            }
            return this.date;
        }
    })
}, false, true);
