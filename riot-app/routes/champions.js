var express = require('express');
var router = express.Router();
var pg = require('pg');



var connectionString = 'postgres://postgres:spitfire7*@localhost:5432/riotdb';

/* GET CHAMPION COUNT Endpoint. */
router.get('/championcount', function(req, res, next) {
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
        var query = client.query("SELECT count(*) FROM challengers;");

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

/* GET ALL CHAMPIONS Endpoint. */
router.get('/championlist/:limit/:offset', function(req, res, next) {
    var results = [];

    //Params
    var postLimit = req.params.limit;
    var postOffset = req.params.offset;

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
<<<<<<< HEAD
        var query = client.query("select * from challengers limit 10;");
=======
        var query = client.query("SELECT * FROM challengers ORDER BY tablekey LIMIT "+postLimit+" OFFSET "+postOffset+";");
>>>>>>> feature/react-frontend

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
