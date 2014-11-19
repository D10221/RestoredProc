'use strict';
var traceur = require('traceur');
var sqlCommand = traceur.require('src/sqlCommand/route.js');
require('traceur-runtime');
var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var app = express();
var echo = require('./echo/echo_route');
var server = http.createServer(app).listen(8888, function() {
  var host = server.address().address;
  var port = server.address().port;
  var prot = 'http';
  console.log('Example app listening at %s://%s:%s', prot, host, port);
});
var sslOptions = {
  key: fs.readFileSync('ssl/server.key', 'utf-8'),
  cert: fs.readFileSync('ssl/server.crt', 'utf-8'),
  ca: fs.readFileSync('ssl/ca.crt', 'utf-8'),
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
echo.register(app);
sqlCommand.register(app);
app.use(function(req, res, next) {
  res.status(404).send(':( ,Don\'t know what to do with @url.'.replace(/@url/, req.url));
  next();
});
app.use((function(req, res, next) {
  if (!req.secure) {
    var url = 'https://' + sserver.address().address + ':' + sserver.address().port + req.url;
    console.log(' *** \r %s \r Redirected to \r %s \r *** \r', req.url, url);
    return res.redirect(url);
  }
  next();
}));
//# sourceMappingURL=index.es6.js.map