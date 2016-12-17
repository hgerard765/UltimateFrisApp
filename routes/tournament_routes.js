/**
 * Created by student on 12/14/16.
 */
var express = require('express');
var router = express.Router();
var tournament_dal = require('../model/tournament_dal');


// View All players
router.get('/all', function(req, res) {
    tournament_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('tournament/tournamentViewAll', { result:result, stylesheet: 'style.css' });
        }
    });

});

// View the player for the given id
router.get('/', function(req, res){
    if(req.query.tournament_name == null) {
        res.send('tournament_name is null');
    }
    else {
        tournament_dal.getById(req.query.tournament_name, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('tournament/tournamentViewByID', { result:result, stylesheet: 'style.css' });
            }
        });
    }
});


// Return the add a new player form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    tournament_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('tournament/tournamentAdd', { result:result, stylesheet: 'style.css' });
        }
    });
});

// insert a player record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.tournament_name == null) {
        res.send('Tournament Name must be provided.');
    }
    else if(req.query.host == null) {
        res.send('Host must be provided');
    }
        else {
            // passing all the query parameters (req.query) to the insert function instead of each individually
            tournament_dal.insert(req.query, function (err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    //poor practice, but we will handle it differently once we start using Ajax
                    res.redirect(302, '/tournament/all');

                }
            });
        }

    });

// Delete an player for the given player_id
router.get('/delete', function(req, res){
    if(req.query.tournament_name == null) {
        res.send('tournament is null');
    }
    else {
        tournament_dal.delete(req.query.tournament_name, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/tournament/all');
            }
        });
    }
});

router.get('/edit2', function(req, res){
    if(req.query.tournament_name == null) {
        res.send(' Name is required');
    }
    else {
        tournament_dal.getById(req.query.tournament_name, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.render('tournament/tournamentEdit', { stylesheet: 'style.css', result: result});
            }
        });
    }
});


router.get('/update', function(req, res){
    // simple validation
    if(req.query.tournament_name == null) {
        res.send('Tournament Name must be provided.');
    }
    else if(req.query.host == null) {
        res.send('Host must be provided');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        tournament_dal.delete(req.query.tournament_name, function (err, result) {
            tournament_dal.insert(req.query, function (err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    //poor practice, but we will handle it differently once we start using Ajax
                    res.redirect(302, '/tournament/all');

                }
            });
        });
    }

});

module.exports = router;