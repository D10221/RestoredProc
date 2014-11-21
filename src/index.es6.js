'use strict';
/* globals require:true */
require('traceur-runtime');
var traceur = require('traceur');
traceur.sourceMaps = 'file';
var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var app = express();
var sqlCommand = traceur.require('./src/sqlCommand/route.js');
var echo = traceur.require('./src/echo/route.js');



var server = http.createServer(app).listen(8888, function() {
    var host = server.address().address;
    var port = server.address().port;
    var prot = 'http';
   // console.log(JSON.stringify(server.address()));
    console.log('Example app listening at %s://%s:%s', prot, host, port);
});


var sslOptions = {
    key: fs.readFileSync('ssl/server.key','utf-8'),
    cert: fs.readFileSync('ssl/server.crt','utf-8'),
    ca: fs.readFileSync('ssl/ca.crt','utf-8'),
    requestCert: true,
    rejectUnauthorized: false
};


var sserver = https.createServer(sslOptions, app).listen(8889, function() {
    var host = sserver.address().address;
    var port = sserver.address().port;
    var prot = 'https';
    console.log(JSON.stringify(sserver.address()));
    console.log('Example app listening at %s://%s:%s', prot, host, port);
});

//Echo module sets its own route
echo.register(app);
// sqlCommand Registers its Own Route
sqlCommand.register(app);

app.use((req, res, next) =>{
    res.status(404).send(':( ,Don\'t know what to do with @url.'.replace(/@url/, req.url));
    next();
});

/**
*Redirect ething to https
*/
app.use((req, res, next) =>{
    if (!req.secure) {        
        var url = 'https://' + sserver.address().address +':'+sserver.address().port  + req.url;
          console.log(' *** \r %s \r Redirected to \r %s \r *** \r',req.url,url);    
        return res.redirect(url);
    }
    next();
});