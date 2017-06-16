(function() {
    angular
        .module('WAM')
        .controller('flickrController', flickrController);

    function flickrController(currentUser, flickrService, widgetService, $routeParams, $location) {
        var model = this;
        var userId = currentUser['_id'];
        var websiteId = $routeParams['websiteId'];
        var pageId = $routeParams['pageId'];

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

            var widget = {"_page": pageId, "url" : url, "width": "100%", "widgetType" : "IMAGE"};

            var widgetId = $routeParams['widgetId'];
            if (typeof widgetId === "undefined") {
                widgetService
                    .createWidget(widget)
                    .then(function(response) {
                        $location.url("/user/website/"+websiteId+"/page/"+pageId+"/widget");
                    });
            } else {
                widget._id = widgetId;
                widgetService
                    .updateWidget(widgetId, widget)
                    .then(function(response) {
                        $location.url("/user/website/"+websiteId+"/page/"+pageId+"/widget");
                    });
            }
        }

    }
})();