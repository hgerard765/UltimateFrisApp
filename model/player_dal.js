/**
 * Created by student on 12/14/16.
 */
var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM player;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(usa_u_id, callback) {
    var query = 'SELECT * FROM player WHERE usa_u_id = ?';
    var queryData = [usa_u_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO player (player_name, player_level, years_played) VALUES (?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.player_name, params.player_level, params.years_played];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(usa_u_id, callback) {
    var query = 'DELETE FROM player WHERE usa_u_id = ?';
    var queryData = [usa_u_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};