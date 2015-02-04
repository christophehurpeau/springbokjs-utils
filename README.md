# springbokjs-utils [![NPM version][npm-image]][npm-url] [![Build Status][build-status-image]][build-status-url] [![Coverage][coverage-image]][coverage-url]

See the full API [here](http://christophehurpeau.github.io/springbokjs-utils/docs/module-utils.html).

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

[build-status-image]: https://drone.io/github.com/christophehurpeau/springbokjs-utils/status.png
[build-status-url]: https://drone.io/github.com/christophehurpeau/springbokjs-utils/latest
[npm-image]: https://img.shields.io/npm/v/springbokjs-utils.svg?style=flat
[npm-url]: https://npmjs.org/package/springbokjs-utils
[coverage-image]: http://img.shields.io/badge/coverage-98%-green.svg?style=flat
[coverage-url]: http://christophehurpeau.github.io/springbokjs-utils/docs/coverage.html
