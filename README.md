# liri-node-app
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

**How to Use LIRI**

1. In the Terminal type node liri.js [choose a command] [search term]
2. Type one of the following commands and associated search term:
    
    * node liri.js [ concert-this ] [artist name]
    * node liri.js [ spotify-this-song ] [song title]
    * node liri.js [ movie-this ] [movie title]
    * node liri.js [ do-what-it-says ]

**Search Walkthrough**

1. Search for a concert(s) for an Arist/Band using the in Town Artist Events API. The following information about each event:

    * Name of the venue
    * Venue location
    * Date of the Event (MM/DD/YYYY)

    ![Image of Band Search](/images/concertSearch.png)


2. Search for a song uzing the node-spotify-api to retrieve song information from the Spotify API. If no song is provided the program will search for "The Sign" by Ace of Base.

    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from

    ![Image of Song Search](/images/songSearch.png)

    ![Image of Song Search blank](/images/songSearchBlank.png)

3. Search for a movie and retrieve data from the OMDB API. If a movie isn't provided, the program will output information for the movie 'Mr. Nobody.'

   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie. (If the value is present it's returned)
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.

   ![Image of Movie Search](/images/movieSearch.png)

   ![Image of Movie Search blank](/images/movieSearchBlank.png)

4. LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands. It will run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

   ![Image of Random text file content](/images/random.png)
