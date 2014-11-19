'use strict';

var Q = require('q');
var fs = require('fs');
//NOTE: require is traceur.require beacuse is loaded from index.js  ? 
var sqlCommand = require('./sqlCommand.js');

/**
 * Q: callback-pattern as promise
 */
var asPromise = Q.nfcall;

/**
 * @return Promise<IEnumerable<IDictionary>string,object>>
 * or ListOf<Map<string,objecet>>
 * or [[{'key', value}]]
 */
function executeReader(sqlCmdText /*:string*/ , cnx /*:string*/ ) {
    return sqlCommand({
        sqlCmdText: sqlCmdText,
        connectionString: JSON.parse(cnx),
        csx: 'src/sqlCommand/sqlCommand.cs'
    });
}
/**
 * Register Route With app
 */
export
var register = (app) => {

    app.get('/api/slqCmd/:server/:db/:script', (req, res) => {

        var server = req.params.server;
        var db = req.params.db;
        var script = req.params.script;

        var scripLocation = 'sqlScripts/@server/@db/@script.sql'
            .replace(/@server/, server)
            .replace(/@db/, db)
            .replace(/@script/, script);

        var cnxLocation = 'sqlScripts/@server/@db/connectionString.json'
            .replace(/@server/, server)
            .replace(/@db/, db);

        asPromise(fs.readFile, scripLocation, 'utf-8').then(
            sqlCmdText => {
                return asPromise(fs.readFile, cnxLocation, 'utf-8')
                    .then(
                        cnx => executeReader(sqlCmdText, cnx)
                    );
            }
        ).then(
            data => res.send(data), error => res.status(500).send(error)
        );
    });

};