(function() {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, websiteService) {

        var model = this;
        model.userId = $routeParams['userId'];

        function init() {
            findAllWebsitesByUserId();
        }
        init();

        function findAllWebsitesByUserId() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
        }
    }
})();