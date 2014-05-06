'use strict';
var S = require('../index.js');

var Person = S.newClass({
    construct: function(name) {
        this.name = name;
    },
    sayHello: function() {
        return "hello, I'm " + this.name;
    }
});

var Student = Person.extend(function(Student) {
    Student.extendPrototype({
        construct: function(name, grade) {
            Student.superConstruct.call(this, name);
            this.grade = grade;
        },
        sayHello: function() {
            return "hi, I'm a student, my name is " + this.name + " and my grade is " + this.grade;
        }
    });
});

var bob = new Person('Bob');
var jack = new Student('Jack', 'A');


var assert = require('proclaim');
var expect = assert.strictEqual;


test('Person sayHello', function() {
    expect(bob.sayHello(), "hello, I'm Bob");
});
test('Student sayHello', function() {
    expect(jack.sayHello(), "hi, I'm a student, my name is Jack and my grade is A");
});