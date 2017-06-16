(function() {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController(currentUser, websiteService, $location, $routeParams) {

        var model = this;
        model.userId = currentUser['_id'];
        websiteService
            .findAllWebsitesForUser(model.userId)
            .then(function(websites) {
                model.websites = websites;
            });

        function init() {
            model.createWebsite = createWebsite;
        }

        init();

         function createWebsite(website) {
            websiteService
                .createWebsite(website, model.userId)
                .then(function(data) {
                    $location.url('/user/website/');
                });
        }
    }
})();
