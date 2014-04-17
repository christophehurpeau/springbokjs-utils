'use strict';
var S = require('../index.js');

var Person = S.newClass({
    construct: function(name) {
        this.name = name;
    },
    sayHello: function() {
        console.log("hello, I'm " + this.name);
    }
});

var Student = Person.extend(function(Student) {
    Student.extendPrototype({
        construct: function(name, grade) {
            Student.superConstruct.call(this, name);
            this.grade = grade;
        },
        sayHello: function() {
            console.log("hi, I'm a student, my name is " + this.name + " and my grade is " + this.grade);
        }
    });
});

var bob = new Person('Bob');
var jack = new Student('Jack', 'A');

bob.sayHello();
jack.sayHello();