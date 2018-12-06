require('dotenv').config();
//var inquirer = require("inquirer");
var axios = require('axios'); //Bands in Town, Spotify and OMDB APIs
var fs = require('fs');
var moment = require('moment');
var dotenv = require('dotenv');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
const { g, b, gr, r, y } =  require('./console');

var spotify = new Spotify(keys.spotify);


let command = process.argv[2];
let search = process.argv[3];

// inquirer.prompt([
  
//     {
//       type: "list",
//       name: "command",
//       message: "Select type of search:",
//       choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
//     },
  
//     {
//         type: "input",
//         name: "search",
//         message: "Enter artist, song or movie to search.",
        
//     }
    
  
//   ]).then(function(response) {

//     // console.log(response.command);

//     remoteControl(response.command, response.search);
   
//   });




function remoteControl(command, search){
    switch(command){
        case "concert-this":
            //run concert function
            concert(search);
            break;
        case "spotify-this-song":
            //run spotify function
            if (search == null){
                search = "The Sign Ace of Base";
            }
            spotifySearch(search);
            break;
        case "movie-this":
            //run movieSearch function
            if (search == null){
                search = "Mr. Nobody";
            }
            movieSearch(search);
            break;
        case "do-what-it-says":
            //run random function
            random();
            break;
        default:
            console.log("Make a valid selection.");
    }
}

function concert(search){
    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp").then(
    function(response) {
        
            console.log(b("**** Artist: " + search + " ****\n"));
            
            for(var i = 0; i < response.data.length; i++){
                // Then we print out the Name of the venue, Venue location, Date of the Event (use moment to format this as "MM/DD/YYYY")
                console.log(g("Venue: ") + response.data[i].venue.name);
                console.log(g("Location: ") + response.data[i].venue.city + ", " + response.data[i].venue.region );
                console.log(g("Date: ") + moment(response.data[i].datetime).format("MM/DD/YYYY") );//2017-03-19T11:00:00'
                console.log(r("----------------------------"));
            }

    })
    .catch(function(err) {
        console.log(err);
      })
};

function spotifySearch(search){
    spotify.search({ type: 'track', query: search, limit: 20 }).then(function(response) {
        for(var i = 0; i < response.tracks.items.length; i++){
        // Then we print out the Artist(s), The song's name, A preview link of the song from Spotify, The album that the song is from
            // Update response.data items 
            console.log(g("Song Name: ") + response.tracks.items[i].name);
            for(var j = 0; j < response.tracks.items[i].artists.length; j++){
                console.log(g("Artist(s): ") + response.tracks.items[i].artists[j].name);
            }
            console.log(g("Song preview link: ") + response.tracks.items[i].href);
               
            console.log(g("Album: ") + response.tracks.items[i].album.name);
            console.log(r("-----------------------------"));
        }
    })
    .catch(function(err) {
      console.log(err);
    })
};

// function spotifyNull (){
//     spotify
//     .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
//     .then(function(data) {
//         console.log(data); 
//     })
//     .catch(function(err) {
//         console.error('Error occurred: ' + err); 
//     });
// }

function movieSearch(search){
    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy").then(function(response) {
  
    //console.log(response)
    console.log(g("Movie: ") + response.data.Title);
    console.log(g("Year: ") + response.data.Year);
    console.log(g("IMDB Rating: ") + response.data.imdbRating);

    //Displays Rotten Tomatoes rating only if it's provided by API
    for(var i = 0; i < response.data.Ratings.length; i++){
        if(response.data.Ratings[i].Source === "Rotten Tomatoes"){
        console.log(g("Rotten Tomatoes Rating: ") + response.data.Ratings[i].Value);
        } 
    }
    console.log(g("Country Produced: ") + response.data.Country);
    console.log(g("Language: ") + response.data.Language);
    console.log(g("Plot: ") + response.data.Plot);
    console.log(g("Actors: ") + response.data.Actors);
  }
);
};

function random(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }

      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(","); // spotify-this-song, "I Want It That Way" => [spotify-this-song, "I Want It That Way"]
      
        for(var i = 0; i < dataArr.length; i++){
        command = dataArr[0];
        search = dataArr[1];

        remoteControl(command, search)
        }        
      });
}


remoteControl(command, search)
