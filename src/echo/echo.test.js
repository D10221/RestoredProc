/* globals describe: false , require:true */

require('traceur-runtime');
var traceur = require('traceur');

require('chai');

var echo = traceur.require('./src/echo/echo.js');

describe('Echo', function(done) {
   
    it('Should Echo anything', function() {
        echo('hi').then(
            function(x) {
                x.should.equal('hi!');
                done();
            },
            function(e) {
                throw e;
            }
        );
    });

    it('Should Echo anything', function() {
        echo(null).then(
            function(x) {
                x.should.equal(null);
                done();
            },
            function(e) {
                throw e;
            }
        );
    });

});