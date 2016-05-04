var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = 'postgres://postgres:spitfire7*@localhost:5432/riotdb';

/* GET home page. */
router.get('/', function(req, res, next) {

        res.render('index', {
            title: 'LoL Riot Project'
        });
});


module.exports = router;