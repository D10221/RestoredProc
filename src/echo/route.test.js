/* globals describe: false , require:true */

require('traceur-runtime');
var assert = require('chai').assert;

var traceur = require('traceur');
var route = traceur.require('src/echo/route.js');
var appMock = traceur.require('test/appMock.js');

var app = new appMock.App();
route.register(app);

var request = {
    params: {
        what: 'hi'
    }
};  
var ok, msg;

beforeEach(() => {
    ok = false;
    msg = '?';
});

describe('Echo Request', () => {
    it('Should Echo', (done) => {

        var response = new appMock.Response((status, data) => {
            msg = ",onResponse: " + JSON.stringify(data);
            msg += (",Status: " + status);
            ok = (data === 'hi!' && status === 200);
        }, done);

        app.get(route.path)(request, response);

        setTimeout(() => {
            assert.ok(ok, msg);
            done();
        }, 50);

    });
});