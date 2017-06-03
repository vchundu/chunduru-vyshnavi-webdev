(function() {
    angular
        .module('WAM')
        .service('FlickrService', FlickrService);

    function FlickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = ""; // get from flickr
        var secret = ""; // get from flickr
        var urlBase = ""; ;// get from jose code

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();