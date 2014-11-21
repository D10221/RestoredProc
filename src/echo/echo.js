'use strict';

var Q = require('q');
var edge = require('edge');
var path = require('path');
var csx = path.join(__dirname, 'echo.cs');
var echo = edge.func(csx);

var asPromise = Q.nfcall;

var promiseEcho = (what) =>{
    return asPromise(echo, {
        what: what
    });
};

module.exports = promiseEcho;