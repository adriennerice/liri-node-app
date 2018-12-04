require('dotenv').config();
var axios = require('axios'); //Bands in Town, Spotify and OMDB APIs
var fs = require('fs');
var moment = require('moment');
var dotenv = require('dotenv');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);



let command = process.argv[2];
// concert-this
// spotify-this-song
    // node liri.js spotify-this-song cab
    // node liri.js spotify-this-song 
// movie-this
// do-what-it-says
let search = process.argv[3];
console.log(search)
//Use Inquirer for user input

switch(command){
    case "concert-this":
        //run concert function
        concert();
        break;
    case "spotify-this-song":
        //run spotify function
        if (search == null){
            search = "The Sign Ace of Base";
        }
        spotifySearch();
        break;
    case "movie-this":
        //run movieSearch function
        if (search == null){
            search = "Mr. Nobody";
        }
        movieSearch();
        break;
    case "do-what-it-says":
        //run random function
        break;
    default:
        console.log("Make a valid selection.");
}

function concert(){
    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp").then(
    function(response) {
        console.log("Artist: " + search);
        
        for(var i = 0; i < response.data.length; i++){
             // Then we print out the Name of the venue, Venue location, Date of the Event (use moment to format this as "MM/DD/YYYY")
            console.log("Venue: " + response.data[i].venue.name);
            console.log("Location: "+ response.data[i].venue.city + ", " + response.data[i].venue.region );
            console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY") );//2017-03-19T11:00:00'
            console.log("----------------------------");
        }
    })
    .catch(function(err) {
        console.log(err);
      })
};

function spotifySearch(){
    spotify.search({ type: 'track', query: search, limit: 20 }).then(function(response) {
        console.log(response);
        for(var i = 0; i < response.tracks.items.length; i++){
        // Then we print out the Artist(s), The song's name, A preview link of the song from Spotify, The album that the song is from
            // Update response.data items 
            console.log("Song Name: " + response.tracks.items[i].name);
            for(var j = 0; j < response.tracks.items[i].artists.length; j++){
                console.log("Artist(s): " + response.tracks.items[i].artists[j].name);
            }
            console.log("Song preview link: " + response.tracks.items[i].href);
               
            console.log("Album: " + response.tracks.items[i].album.name);
            console.log("-----------------------------");
        }
    })
    .catch(function(err) {
      console.log(err);
    })
};

function movieSearch(){
    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy").then(function(response) {
  
    console.log(response)
    console.log("Movie: " + response.data.Title);
    console.log("Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);

    //Displays Rotten Tomatoes rating only if it's provided by API
    for(var i = 0; i < response.data.Ratings.length; i++){
        if(response.data.Ratings[i].Source === "Rotten Tomatoes"){
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[i].Value);
        } 
    }
    console.log("Country Produced: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  }
);
}




