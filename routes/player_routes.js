/**
 * Created by student on 12/14/16.
 */
var express = require('express');
var router = express.Router();
var player_dal = require('../model/player_dal');


// View All players
router.get('/all', function(req, res) {
    player_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('player/playerViewAll', { result:result, stylesheet: 'style.css' });
        }
    });

});

// View the player for the given id
router.get('/', function(req, res){
    if(req.query.usa_u_id == null) {
        res.send('usa_u_id is null');
    }
    else {
        player_dal.getById(req.query.usa_u_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('player/playerViewByID', { result:result, stylesheet: 'style.css' });
            }
        });
    }
});


// Return the add a new player form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    player_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('player/playerAdd', { result:result, stylesheet: 'style.css' });
        }
    });
});

// insert a player record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.player_name == null) {
        res.send('Player Name must be provided.');
    }
    else if(req.query.player_level == null) {
        res.send('Player Level must be provided');
    }
    else if (req.query.years_played == null) {
            res.send('Number of Years played must be provided');
        }
        else {
            // passing all the query parameters (req.query) to the insert function instead of each individually
            player_dal.insert(req.query, function (err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    //poor practice, but we will handle it differently once we start using Ajax
                    res.redirect(302, '/player/all');

                }
            });
        }

    });

// Delete an player for the given player_id
router.get('/delete', function(req, res){
    if(req.query.usa_u_id == null) {
        res.send('usa_u_id is null');
    }
    else {
        player_dal.delete(req.query.usa_u_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/player/all');
            }
        });
    }
});

router.get('/edit2', function(req, res){
    if(req.query.usa_u_id == null) {
        res.send(' ID is required');
    }
    else {
        player_dal.getById(req.query.usa_u_id, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.render('player/playerEdit', { stylesheet: 'style.css', result: result});
            }
        });
    }
});


router.get('/update', function(req, res){
    // simple validation
    if(req.query.player_name == null) {
        res.send('Player Name must be provided.');
    }
    else if(req.query.player_level == null) {
        res.send('Player Level must be provided');
    }
    else if (req.query.years_played == null) {
        res.send('Number of Years played must be provided');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        player_dal.delete(req.query.usa_u_id, function (err, result) {
            player_dal.insert(req.query, function (err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    //poor practice, but we will handle it differently once we start using Ajax
                    res.redirect(302, '/player/all');

                }
            });
        });
    }

});

module.exports = router;