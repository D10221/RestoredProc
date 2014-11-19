'use strict';

var Q = require('q');
var edge = require('edge');

var echo = function(what) {
    return Q.nfcall(edge.func('src/echo/echo.cs'), {
        what: what
    });
};

function register(app){
    app.get('/api/echo/:what', 
        function(req,res){
        echo(req.params.what).then(
            function(data){
                console.log(JSON.stringify(data));
                res.send(data);
            },
            function(error){
                res.send(500,(error ? error.message : 'Wtf?'));
            }
        );
    });
}
module.exports = {
    echo: echo,
    register: register
};