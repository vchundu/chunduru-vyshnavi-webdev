(function() {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

    function pageListController($routeParams, pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        function init() {
            model.pages = pageService.findAllPagesFromWebsite(model.websiteId);
        }

        init();
    }

})();