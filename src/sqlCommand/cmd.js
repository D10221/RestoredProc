'use strict';

var fs = require('fs');
var sqlCommand = require('./sqlCommand');

var sql, cnx, csx;

process.argv.forEach(function(val, index, array) {
    if (val === '--sql') {        
        sql = fs.readFileSync(array[index + 1]).toString();
    }
    if (val === '--cnx') {
        cnx = JSON.parse(fs.readFileSync(array[index+1]));
    }
    if(val === '--csx'){
        csx = array[index+1];
    }
});

if (!(sql, cnx, csx)) {
    console.error('Usage: --sql <sqlScriptLocation> --cnx <connectionStringLocation> --csx <CsxScriptLocation>');
    return;
}

sqlCommand({sqlCmdText: sql, connectionString: cnx, csx: csx}).then(
    function(data){
        console.log(JSON.stringify(data));
    },
    function(error){
        console.error(error);
    }
);