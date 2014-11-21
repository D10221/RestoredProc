'use strict';

var Q = require('q');
var echo = require('./echo');

var what = null;
process.argv.forEach(function(val, index, array) {
    if (val === '--what') {
        what = array[index + 1];
    }
});
if (!what) {
    console.error('Usage: --what whatToEcho');
    return;
}

echo(what).then(
    function(x) {
        console.log(JSON.stringify(x));
    }, 
    function(e) {
        console.error(e);
    }
);