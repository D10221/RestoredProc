'use strict';

var Q = require('q');
var edge = require('edge');

/**
* {sqlCmdText,connectionString }
* csx?  
*/
var sqlCommand = function( scriptInfo,csx) {
    csx = csx || scriptInfo.csx;

    if(!scriptInfo.sqlCmdText){
        throw new Error('Missing parameter sqlCmdText');
    }
    if(! scriptInfo.connectionString){
        throw new Error('Missing parameter connectionString');
    }
    return Q.nfcall(edge.func(csx),scriptInfo);
};

module.exports = sqlCommand;