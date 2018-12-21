// Linking .env file
require("dotenv").config();

// Required files / Required modules
var keys = require("./keys.js");
var fs = require("fs");
var dotenv = require("dotenv");
var axios = require("axios");
var inquirer = require("inquirer");
var moment = require("moment");
var Spotify = require("node-spotify-api");

// Shortcuts
var log = console.log;
var argv = process.argv;

// Spotify Search Parameter
var song;

// i.e. movie-this
var userCommand = argv[2];
// i.e. movie title
var secondCommand = argv[3];

function movie() {
    axios.get("http://www.omdbapi.com/?apikey=862d8cc6&type=movie&t=" + secondCommand).then(function (response) {
        log(" ");
        log("========== MOVIE INFO ==========");
        // Movie Title
        log("Title: " + response.data.Title);
        // Movie Year Released
        log("Year " + response.data.Year);
        // Movie Rating
        log("Rating " + response.data.imdbRating);
        // Movie Country
        log("Country " + response.data.Country);
        // Movie Language
        log("Language: " + response.data.Language);
        // Movie Plot
        log("Plot: " + response.data.Plot);
        // Movie Actors
        log("Actors: " + response.data.Actors);
        log("================================");

    });
}

// Infinite word amount for secondCommand
for (var i = 4; i < argv.length; i++) {
    secondCommand += '+' + argv[i];
}

//Fetch Spotify Keys
var spotify = new Spotify(keys.spotify);

function bandsInTown() {
    axios.get("https://rest.bandsintown.com/artists/" + secondCommand + "/events?app_id=codingbootcamp").then(function (response) {
        log(" ");
        log("========== BAND INFO ==========");
        // Venue Name
        log("Venue Name: " + response.data[0].venue.name);
        // Venue Location
        log("Venue Location: " + response.data[0].venue.city);
        // Venue Date
        log("Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
        log("===============================");

    });
}

if (userCommand === "concert-this") {
    if (secondCommand === undefined) {
        secondCommand = "muse";
        log(" ");
        log("========== PLEASE READ ==========");
        log("Hey! LIRI here. I just wanted to let you know that you did not\nenter in an artist/band so I searched up the band Muse for you!");
        log(" ");
        log("Here's the syntax if you forgot: node liri.js concert-this <band/artist>");
        log("=================================");
        log(" ");

        bandsInTown();
    } else {
        bandsInTown();
    }
}

if (userCommand === "movie-this") {
    if (secondCommand === undefined) {
        secondCommand = "Mr. Nobody";
        log(" ");
        log("========== PLEASE READ ==========");
        log("Hey! LIRI here. I just wanted to let you know that you did not\nenter in a movie so I searched up the movie Mr. Nobody for you!");
        log(" ");
        log("Here's the syntax if you forgot: node liri.js concert-this <movie>");
        log("=================================");
        log(" ");

        movie();
    } else {
        movie();
    }
}

if (userCommand === "spotify-this-song") {
    if (secondCommand === undefined) {
        secondCommand = "Eminem Infinite";
        log(" ");
        log("========== PLEASE READ ==========");
        log("Hey! LIRI here. I just wanted to let you know that you did not\nenter in a song so I searched up Infinite by Eminem for you!");
        log(" ");
        log("Here's the syntax if you forgot: node liri.js spotify-this-song <band/artist/song>");
        log("=================================");
        log(" ");

        spotifySearch(secondCommand);
    } else {
        spotifySearch(secondCommand);
    }
}


// Function for running a Spotify search
function spotifySearch(song) {
    spotify.search({
        type: 'track',
        query: song
    }, function (err, response) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        log(" ");
        log("========== SPOTIFY INFO ==========");
        // artist(s)
        log("Artist: " + response.tracks.items[0].artists[0].name);
        // Song name 
        log("Song: " + response.tracks.items[0].name);
        // Preview link of song 
        log("Preview Link: " + response.tracks.items[0].preview_url);
        // album that the song is from
        log("Album: " + response.tracks.items[0].album.name);
        log("==================================");

    });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            log("Error: " + err);
        }

        var dataArr = data.split(",");

        if (dataArr[0] === "spotify-this-song") {
            // Implementing index one from the array and removing the last element
            var songAdd = dataArr[1].slice(1, -1);
            spotifySearch(songAdd);
        }
    });
}

if (userCommand === "do-what-it-says") {
    doWhatItSays();
}