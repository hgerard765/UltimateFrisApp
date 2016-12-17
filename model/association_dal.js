/**
 * Created by student on 12/14/16.
 */
var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM association;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(association_id, callback) {
    var query = 'SELECT * FROM association WHERE association_id = ?';
    var queryData = [association_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO association (association_name, description) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.association_name, params.description];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(association_id, callback) {
    var query = 'DELETE FROM association WHERE association_id = ?';
    var queryData = [association_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};