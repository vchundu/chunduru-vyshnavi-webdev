(function() {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController(currentUser,$routeParams, pageService, $location) {

        var model = this;

        model.userId = currentUser['_id'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function init() {
            pageService
                .findAllPagesFromWebsite(model.websiteId)
                .then(function(pages) {
                    model.pages = pages;
                });
            // probably would angular.copy before passing this in

            pageService
                .findPageById(model.pageId)
                .then(function(page) {
                    model.page = angular.copy(page);
                });


            model.updatePage = updatePage;
            model.deletePage = deletePage;
        }
        init();

        function updatePage() {
            pageService
                .updatePage(model.pageId, model.page)
                .then(function(page) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });

        }

        function deletePage() {
            pageService
                .deletePage(model.pageId)
                .then(function(page) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });
        }
    }
})();