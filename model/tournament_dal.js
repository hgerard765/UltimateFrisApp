/**
 * Created by student on 12/14/16.
 */
var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM tournament;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(tournament_name, callback) {
    var query = 'SELECT * FROM tournament WHERE tournament_name = ?';
    var queryData = [tournament_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO tournament(tournament_name, host) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.tournament_name, params.host];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(tournament_name, callback) {
    var query = 'DELETE FROM tournament WHERE tournament_name = ?';
    var queryData = [tournament_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};