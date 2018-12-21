**Psuedo Code**

1. Search for songs using Spotify

2. Search for concerts using Bands in Town 

3. Search for Movies using OMDB

4. Send requests to all 3 of these API's using **axios**

`This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
 Name of the venue
 Venue location
 Date of the Event (use moment to format this as "MM/DD/YYYY")`

`node liri.js spotify-this-song '<song name here>'
This will show the following information about the song in your terminal/bash window
Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from`