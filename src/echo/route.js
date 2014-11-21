'use strict';

var Q = require('q');
var edge = require('edge');

var asPromise = Q.nfcall;

function echo (what) {
    return asPromise(edge.func('src/echo/echo.cs'), {
        what: what
    });
}


var register = function(app){
    app.get('/api/echo/:what', function (req,res) {
     echo(req.params.what)
        .then(
            function(data) {res.send(data); } ,
            function(error) {res.send(500,(error ? error.message : 'Wtf?'));}
        );
});
};

module.exports =  {
    register: register
    };