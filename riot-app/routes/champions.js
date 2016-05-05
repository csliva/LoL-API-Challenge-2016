var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = 'postgres://postgres:spitfire7*@localhost:5432/riotdb';

/* GET Data Endpoint. */
router.get('/championlist', function(req, res, next) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("select * from challengers limit 10;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
});

module.exports = router;
