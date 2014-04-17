var fs = require('../fs');

fs.readFile('./fs.js')
    .then(function(value) {
        console.log('succes ', value.toString());
    })
    .catch(function(error) {
        console.error('error', error);
    });