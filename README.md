# LoL-API-Challenge-2016
A league of legends data analysis for the 2016 Riot API challenge. Collect data on champion mastery.

## Technologies
This project was intended to be a practice in javascript. Our stack largely represents the most popular javascript libraries as a result!
* Node.js
* Express
* jQuery for AJAX
* D3.js for data representation
* React and JSX for frontend markup and that sweet "Single page app" feel
* Postgresql database
* Python for data collection

## Project

### Python
The project kicked off with collecting data from the Riot APIs and pulling them into our database. We used Python to do this because of easy binding with postgresql and a great request library for http/json access.

Also, instead of putting a lot of strain on the game servers, we rate limited with the standard API access token that gave up 500 requests per 10 minutes. With 3 api calls per player, and 200 challenger players, the script takes about a half hour to finish.

### Postgresql
The database needed to be sql, and we wanted to collect as much data as possible, so when it came time to write out sql commands, we would have plenty of lattitude to work with.

### Node.js and Express
This was the get the server up quickly and efficiently. This project was built across a linux server, a linux desktop, and a windows machine. Viewing the site was as easy as npm start. Or forever -w start ./bin/www if you want to get specific!

### React
React is a great technology and JSX seems to be more efficient than the jade templates and slower routing. In a way, React allowed us to cache database calls, preventing repetitive queries that an alternative MVC (looking at you Ruby on Rails) would have enforced.

## Questions and Conclusions
We weren't sure what we were going to do with the data, so we collected as much as possible. Questions popped out from the data as we looked at different ways to analyze it. While this doesn't necessarily make the data contiuously accessible in new patches, it provided some great conclusions about how mastery plays a role in the highest ranks of League of Legends, and what that means for us Peons in Wood division.

## Run this yourself
If you're interested in building this project out, feel free to clone the master. Here are some step to take in order to get started.

After cloning, you may run: npm start
which will kick off the server in watch mode.

In order to get a database, create a new postgresql user and database. Under Python/getMasters.py edit the database information. Make sure you have the requests library and our postgresql binding, psycopg2 installed. Then run: python getChallengers.py
The script will query you for a unique Riot API key, and then you're off to the races.

Once the script has finished, update the database information under routes/champions.js

That's it. Now you have a running implementation of our site.
There's a couple of fun things we would love to check out.

* Get data from the 800 masters level players
* Query current featured games, and collect random data
* Graph champion popularity over time

That's all folks. If you have any questions, you can contact me personally at colt.sliva@gmail.com or add me in game with the user name Funkmaster C
