/* globals describe: false, before:false, after:false, afterEach: false*/

/** globals expect:true */
//var expect = require('chai').expect;

// var assert = require('assert'); //Mocha


// var should = require('chai').should();
var should = require('chai').should();
/*should.exist
should.not.exist
should.equal
should.not.equal
should.Throw
should.not.Throw*/

var echo = require('./echo');

describe('Echo', function() {

    before(function() {
        // runs before all tests in this block
    });
    after(function() {
        // runs after all tests in this block
    });
    beforeEach(function() {
        // runs before each test in this block
    });
    afterEach(function() {
        // runs after each test
    });
    it('Should Be Ok', function() {
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