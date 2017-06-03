(function() {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController(pageService, $routeParams, $location) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        function init() {
            pageService
                .findAllPagesFromWebsite(model.websiteId)
                .then(function(pages) {
                    model.pages = pages;
                });

            model.createPage = createPage;
        }
        init();

        function createPage(page) {
            pageService
                .createPage(page, model.websiteId)
                .then(function(page) {
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
                });
        }
    }
})();