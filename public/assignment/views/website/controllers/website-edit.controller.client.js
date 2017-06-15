(function() {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController(currentUser, $routeParams, websiteService, $location) {

        var model = this;
        model.userId = currentUser['_id'];
        model.websiteId = $routeParams['websiteId'];

        websiteService
            .findAllWebsitesForUser(model.userId)
            .then(function(websites) {
                model.websites = websites;
            });

        websiteService
            .findWebsiteById(model.websiteId)
            .then(function(website) {
                model.website = angular.copy(website);
            });


        model.deleteWebsite = function() {
            websiteService
                .deleteWebsite(model.websiteId)
                .then(function(website) {
                    $location.url('/user/'+model.userId+'/website');
                });
        };

        model.updateWebsite = function() {
            websiteService
                .updateWebsite(model.websiteId, model.website)
                .then(function(website) {
                    $location.url('/user/'+model.userId+'/website');
                });
        };

    }
})();
