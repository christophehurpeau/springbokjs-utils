springbokjs-utils

### Use class

```js
var S = require('springbokjs-utils');

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
```

You can also write:
```js
// file Person.js

var S = require('springbokjs-utils');

var Person = S.newClass();
module.exports = Person;

Person.extendPrototype({
    construct: function(name) {
        this.name = name;
    },
    sayHello: function() {
        console.log("hello, I'm " + this.name);
    }
});
```

The first argument of `S.newClass` or `.extend` is either a callback, or an object. If it is an object, extendPrototype is called.
With a function you can create private methods.
You can also use defineProperties, defineProperty, see the full API for more informations.


### fs with Promises

```js
var fs = require('springbokjs-utils/fs');

fs.readFile('./myfile')
    .then(function(contentBuffer) {
        console.log('success ', contentBuffer.toString());
    })
    .catch(function(error) {
        console.error('error', error);
    });

Promise.all([
    fs.readFile('./myFirstFile'),
    fs.readFile('./mySecondFile')
]).then(function(contents) {
    console.log('myFirstFile content', contents[0].toString());
    console.log('mySecondFile content', contents[1].toString());
});

```

