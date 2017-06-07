(function() {
    angular
        .module('VSpotify')
        .controller('homePageController', homePageController);

    function homePageController($http) {
        var model = this;
        model.artistByName = artistByName;
        model.artistById = artistById;

        function artistByName(artistName) {
            console.log(artistName);
            $http.get('/api/project/artist/name?name='+artistName)
                .then(function(response) {
                    console.log(response.data);
                });
        }

        function artistById(artistId) {
            console.log(artistId);
            $http.get('/api/project/artist/id/'+artistId)
                .then(function(response) {
                    console.log(response.data);
                });
        }
    }
})();