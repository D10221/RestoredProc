/* globals describe: false */

require('chai').should();

var echo = require('./echo');

describe('Echo', function() {
   
    it('Should Echo things', function() {
        echo('hi').then(
            function(x) {
                x.should.equal('hi');
            },
            function(e) {
                e.should.equal('I want it to fail, but referenced, jshint doesnt complain without me making a jshint comment');
            }
        );
    });
});