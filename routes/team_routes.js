/**
 * Created by Hayley on 12/16/2016.
 */
var express = require('express');
var router = express.Router();
var team_dal = require('../model/team_dal');
var association_dal = require('../model/association_dal');
var player_dal = require('../model/player_dal');


// View All
router.get('/all', function(req, res) {
    team_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('team/teamViewAll', { result:result, stylesheet: 'style.css' });
        }
    });

});

// View the player for the given id
router.get('/', function(req, res){
    if(req.query.team_name == null) {
        res.send('team_name is null');
    }
    else {
        team_dal.getById(req.query.team_name, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('team/teamViewByName', { result:result, stylesheet: 'style.css' });
            }
        });
    }
});


// Return the add a new player form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    team_dal.getAll(function (err,team) {
        player_dal.getAll(function(err,players) {
            association_dal.getAll(function (err, association) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.render('team/teamAdd', { team: team, players: players, association: association, stylesheet: 'style.css' });
                }
            });
        });
    });
});

// insert a player record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.team_name == null) {
        res.send('A Team must be entered');
    }
    else if(req.query.gender == null) {
        res.send('A gender must be entered');
    }
    else if(req.query.competition_level == null) {
        res.send('A Competition Level must be entered');
    }
    else if(req.query.school == null) {
        res.send('A School must be entered');
    }
    else if(req.query.association_name == null) {
        res.send('An Association must be selected');
    }
    else if(req.query.usa_u_id == null) {
        res.send('An Captain ID must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        team_dal.insert(req.query, function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/team/all');
            }
        });
    }

});

// Delete an player for the given player_id
router.get('/delete', function(req, res){
    if(req.query.team_name == null) {
        res.send('team_name is null');
    }
    else {
        team_dal.delete(req.query.team_name, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/team/all');
            }
        });
    }
});



router.get('/edit2', function(req, res){
    if(req.query.team_name == null) {
        res.send(' name is required');
    }
    else {
        team_dal.getById(req.query.team_name, function(err, team) {
            player_dal.getAll(function(err, players) {
                association_dal.getAll(function (err, associations) {
                    if (err) {
                        res.send(err);
                    } else {
                        console.log("PLAYERS: "+ players);
                        res.render('team/teamEdit', { stylesheet: 'style.css', team: team, players: players, association: associations});
                    }
                });

            });
        });
    }
});

router.get('/update', function(req, res){
    // simple validation
    if(req.query.team_name == null) {
        res.send('A Team must be entered');
    }
    else if(req.query.gender == null) {
        res.send('A gender must be entered');
    }
    else if(req.query.competition_level == null) {
        res.send('A Competition Level must be entered');
    }
    else if(req.query.school == null) {
        res.send('A School must be entered');
    }
    else if(req.query.association_name == null) {
        res.send('An Association must be selected');
    }
    else if(req.query.usa_u_id == null) {
        res.send('An Captain ID must be selected');
    }
    else {

        team_dal.delete(req.query.old_name, function (err, result) {
            team_dal.insert(req.query, function (err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    //poor practice, but we will handle it differently once we start using Ajax
                    res.redirect(302, '/team/all');

                }
            });
        });
    }

});

module.exports = router;