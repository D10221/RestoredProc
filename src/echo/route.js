'use strict';

var Q = require('q');
var edge = require('edge');

var asPromise = Q.nfcall;

function echo (what) {
    return asPromise(edge.func('src/echo/echo.cs'), {
        what: what
    });
}

var path = '/api/echo/:what';

var register = function(app){
    app.get(path, function (req,res) {
     echo(req.params.what)
        .then(
            function(data) {res.send(data); } ,
            function(error) {res.status(500).send((error ? error.message : 'Wtf?'));}
        );
});
};

module.exports =  {
    register: register, path: path
    };