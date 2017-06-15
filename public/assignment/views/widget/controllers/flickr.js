(function() {
    angular
        .module('WAM')
        .controller('flickrController', flickrController);

    function flickrController(currentUser,FlickrService) {
        var model = this;

        model.searchPhotos = function(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

    }
})();