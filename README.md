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

