/**
 * Created by Hayley on 12/16/2016.
 */
var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM team_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(team_name, callback) {
    var query = 'SELECT * FROM team_view WHERE team_name = ?';
    var queryData = [team_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO team (team_name, captain_id, association_name, gender, competition_level, school) VALUES' +
        ' (?, (select usa_u_id from player where player.usa_u_id = ?), ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.team_name, params.usa_u_id, params.association_name, params.gender, params.competition_level, params.school];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(team_name, callback) {
    var query = 'DELETE FROM team where team_name = ?';
    var queryData = [team_name];
    console.log("TEAM NAME: " + team_name);

    connection.query(query, queryData, function(err, result) {
        console.log('gets here' + result);
        callback(err, result);
    });

};