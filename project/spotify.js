// TODO rename to something more descriptive
// basically this is app

var SpotifyWebApi = require('spotify-web-api-node');
var app = require('../express');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var spotifyApi = SpotifyWebApi({
    clientId: "f57ffe21e3204a55bb467f508a175ca2",
    clientSecret: "a72e21b49f7a4271b4778279a79b8add",
    redirectUri: "localhost:3000/project/index.html"
});

var scopes = 'user-read-private user-read-email';
var stateKey = 'spotify_auth_state';

app.get("/api/project/artist/name", getArtistsByName);

function getArtistsByName(req, res) {
    var name = req.query['name'];
    spotfiyApi.searchArtists(name)
        .then(function(data) {
            console.log('Artists with ' + name + ' ');
            console.log(data.body);
        }, function(err) {
            console.log('something went wrong');
        });
}

app.get("/api/project/artist/id/:artistId", getArtistById);

function getArtistsById(req, res) {
    var id = req.params['artistId'];
    spotifyApi.getArtist(id)
        .then(function(data) {
            console.log(data.body);
        }, function(error) {
            console.log('something went wrong');
        });
}



