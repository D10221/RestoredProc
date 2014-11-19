'use strict';

var Q = require('q');
var edge = require('edge');
var echo = edge.func('./echo.cs');

/*function asPromise(...params){
    return Q.nfcall(params);
}*/

var asPromise = Q.nfcall;

var promiseEcho = function(what) {
    return asPromise(echo, {
        what: what
    });
};

module.exports = promiseEcho;

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

promiseEcho(what).then(
    function(x) {
        console.log(JSON.stringify(x));
    }, 
    function(e) {
        console.error(e);
    }
);