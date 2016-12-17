var express = require('express');
var router = express.Router();

router.get('/all', function(req, res) {
    res.render('about/aboutProject', {title: "About Project", stylesheet: "about.css", isDiagram: false, isRelational: false, image: null});
});

router.get('/diagram', function(req, res) {
    res.render('about/aboutProject', {title: "About Project", stylesheet: "about.css", isDiagram: true, isRelational: false,
        image: "../images/ER_diagram.png"});
});

router.get('/relational', function(req, res) {
    res.render('about/aboutProject', {title: "About Project", stylesheet: "about.css", isDiagram: false, isRelational: true,
        image: "../images/relational_schema.png"});
});
module.exports = router;