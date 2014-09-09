# springbokjs-library [![NPM version][npm-image]][npm-url] [![Coverage][coverage-image]][coverage-url]
springbokjs-utils


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

[npm-image]: https://img.shields.io/npm/v/springbokjs-library.svg?style=flat
[npm-url]: https://npmjs.org/package/springbokjs-library
[coverage-image]: http://img.shields.io/badge/coverage-100%-brightgreen.svg?style=flat
[coverage-url]: http://christophehurpeau.github.io/springbokjs-utils/docs/coverage.html
