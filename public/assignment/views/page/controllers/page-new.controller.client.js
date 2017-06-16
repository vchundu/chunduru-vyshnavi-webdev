(function() {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController(currentUser, pageService, $routeParams, $location) {
        var model = this;
        model.userId = currentUser['_id'];
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
                    $location.url("/user/website/"+model.websiteId+"/page");
                });
        }
    }
})();