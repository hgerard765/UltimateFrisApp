var express = require('express');
var router = express.Router();
var teamplayer_dal = require('../model/teamplayer_dal');
var team_dal = require('../model/team_dal');


// View All
router.get('/all', function(req, res) {
    teamplayer_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('teamplayer/teamplayerViewAll', { result:result, stylesheet: 'style.css' });
        }
    });

});

// View the player for the given id
router.get('/', function(req, res){
    if(req.query.usa_u_id == null) {
        res.send('usa_u_id is null');
    }
    else {
        teamplayer_dal.getById(req.query.usa_u_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('teamplayer/teamplayerViewById', { result:result, stylesheet: 'style.css' });
           }
        });
    }
});

// Return the add a new school form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    team_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('teamplayer/teamplayerAdd', {'team': result});
        }
    });
});

// insert a school record
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
    else if(req.query.team_name == null) {
        res.send('A Team must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        teamplayer_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/teamplayer/all');
                alert('Player and Team Name added succesfully!')
            }
        });
    }
});

// Delete a school for the given school_id
router.get('/delete', function(req, res){
    if(req.query.usa_u_id == null) {
        res.send('usa_u_id is null');
    }
    else {
         teamplayer_dal.delete(req.query.usa_u_id, function(err, result){
             if(err) {
                 res.send(err);
             }
             else {
                 //poor practice, but we will handle it differently once we start using Ajax
                 res.redirect(302, '/teamplayer/all');
             }
         });
    }
});

module.exports = router;
