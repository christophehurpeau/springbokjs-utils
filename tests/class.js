var S = require('../index.js');

var Person = S.newClass(function(newClass) {
    console.log('Creating a person');
    newClass.constructor = function(name) {
        this.name = name;
    };
    newClass.prototype = {
        sayHello: function() {
            console.log("hello, I'm " + this.name);
        }
    };
});

var Student = Person.extend(function(extend) {
    extend.prototype = {
        sayHello: function() {
            console.log("hi, I'm a student and my name is " + this.name);
        }
    };
});

var bob = new Person('Bob');
var jack = new Student('Jack');

bob.sayHello();
jack.sayHello();