(function() {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        model.websites = websiteService.findAllWebsitesForUser(model.userId);

        model.website = websiteService.findWebsiteByIdAndUser(model.websiteId, model.userId);

        model.deleteWebsite = function() {
            websiteService.deleteWebsite(model.websiteId, model.userId);
        };

        model.updateWebsite = function() {
            websiteService.updateWebsite(model.websiteId, model.userId);
        };

    }
})();
