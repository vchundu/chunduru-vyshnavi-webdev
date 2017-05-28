(function() {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams, pageService) {

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function init() {
            model.pages = pageService.findAllPagesFromWebsite(model.websiteId);
            model.page = pageService.findPageByIdAndWebsite(model.pageId, model.websiteId);
            
        }

        init();
    }
})();