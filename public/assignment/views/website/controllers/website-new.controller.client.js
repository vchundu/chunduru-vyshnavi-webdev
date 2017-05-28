(function() {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController(websiteService, $location, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websites = websiteService.findAllWebsitesForUser(model.userId);

        function init() {
            model.createWebsite = createWebsite;
        }

        init();

         function createWebsite(website) {
            websiteService.createWebsite(website, model.userId);
            $location.url('/user/'+model.userId+'/website/');
        }
    }
})();
