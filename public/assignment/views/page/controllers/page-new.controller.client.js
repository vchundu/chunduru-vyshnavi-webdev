(function() {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController(pageService, $routeParams, $location) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        function init() {
            model.pages = pageService.findAllPagesFromWebsite(model.websiteId);
            model.createPage = createPage;
        }
        init();

        function createPage(page) {
            pageService.createPage(page, model.websiteId);
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
        }
    }
})();