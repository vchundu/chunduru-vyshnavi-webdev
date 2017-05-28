(function() {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        model.websites = websiteService.findAllWebsitesForUser(model.userId);

        model.website = angular.copy(websiteService.findWebsiteById(model.websiteId));

        model.deleteWebsite = function() {
            websiteService.deleteWebsite(model.websiteId);
            $location.url('/user/'+model.userId+'/website');
        };

        model.updateWebsite = function() {
            websiteService.updateWebsite(model.websiteId, model.website);
            $location.url('/user/'+model.userId+'/website');
        };

    }
})();
