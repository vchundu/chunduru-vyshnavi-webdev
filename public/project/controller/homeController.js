(function() {
    angular
        .module('vSpotify')
        .controller('homeController', homeController);

    function homeController($http){
        var model = this;

        var apiKey = "75976284cdc3d5dddbf7f5ea3af59ca4";
        var sharedSecret = "7e20fa25d81176c05ed8e0950d93625";
        var apiRoot = "http://ws.audioscrobbler.com/2.0/";
        model.searchAlbum = searchAlbum;
        model.getImage = getImage;
        model.searchAlbumById = searchAlbumById;

        function searchAlbum(searchText) {
            $http.get(apiRoot+"?method=album.search&album="+searchText+"&api_key="+apiKey+"&format=json")
                .then(function(response) {
                    model.songs = response.data.results.albummatches.album;
                });
        }

        function getImage(song) {
            if (typeof song === "undefined") {
                // do nothing
            } else {
                return song.image[0]['#text'];
            }
        }

        function searchAlbumById(id) {
            $http.get(apiRoot+"?method=album.getinfo&api_key="+apiKey+"&mbid="+id+"&format=json")
                .then(function(response) {
                    model.song = response.data.album;
                });
        }
    }

})();