# liri-node-app
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

How to Use LIRI

1. In the Terminal type node liri.js [choose a command] [search term]
2. Type one of the following commands and associated search term:
    
    * node liri.js concert-this (artist name)
    * node liri.js spotify-this-song (song title)
    * node liri.js movie-this (movie title)
    * do-what-it-says

Walkthrough

1. Search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

    * Name of the venue
    * Venue location
    * Date of the Event (use moment to format this as "MM/DD/YYYY")

    ![Image of Band Search](/images/concertSearch.png)
    
    ![Image of Movie Search blank](/images/concertSearchBlank.png)

2. You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.

    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from

    ![Image of Song Search](/images/songSearch.png)

3. Search for a movie and retrieve data from the OMDB API. If a movie isn't typed in, the program will output data for the movie 'Mr. Nobody.'

   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.

   ![Image of Movie Search](/images/movieSearch.png)

   ![Image of Movie Search blank](/images/movieSearchBlank.png)

4. LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands. It will run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

![Image of Random text file content](/images/random.png)
