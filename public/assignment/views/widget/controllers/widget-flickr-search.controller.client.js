/* TODO
    - fix everything for creating images
    - go through what you lost points on for previous assignments
    - finish select photo
    - deal with that widgetType error when creating/editing widgets
    -
 */



(function() {
    angular
        .module('WAM')
        .controller('flickrController', flickrController);

    function flickrController(flickrService, widgetService) {
        var model = this;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            widgetService
                .updateWidget(websiteId, pageId, widgetId, {url: url})
                .then(function(response) {
                    return response.data;
                });
        }

    }
})();