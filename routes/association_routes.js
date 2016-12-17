/**
 * Created by student on 12/14/16.
 */
var express = require('express');
var router = express.Router();
var association_dal = require('../model/association_dal');



// View All
router.get('/all', function(req, res) {
    association_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('association/associationViewAll', { result:result, stylesheet: 'style.css' });
        }
    });

});

// View  for the given id
router.get('/', function(req, res){
    if(req.query.association_id == null) {
        res.send('association_id is null');
    }
    else {
        association_dal.getById(req.query.association_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                console.log("RESULT: " + result[0].association_name);
                res.render('association/associationViewByID', { result:result, stylesheet: 'style.css' });
            }
        });
    }
});


// Return the add a new player form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    association_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('association/associationAdd', { result:result, stylesheet: 'style.css' });
        }
    });
});

// insert a player record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.association_name == null) {
        res.send('Association Name must be provided.');
    }
    else if(req.query.description == null) {
        res.send('Description must be provided');
    }
        else {
            // passing all the query parameters (req.query) to the insert function instead of each individually
            association_dal.insert(req.query, function (err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    //poor practice, but we will handle it differently once we start using Ajax
                    res.redirect(302, '/association/all');
                }
            });
        }

    });

// Delete an player for the given player_id
router.get('/delete', function(req, res){
    if(req.query.association_id == null) {
        res.send('association_id is null');
    }
    else {
        association_dal.delete(req.query.association_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/association/all');
            }
        });
    }
});

module.exports = router;