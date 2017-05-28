(function() {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams, pageService, $location) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function init() {
            model.pages = pageService.findAllPagesFromWebsite(model.websiteId);
            // probably would angular.copy before passing this in
            model.page = angular.copy(pageService.findPageByIdAndWebsite(model.pageId, model.websiteId));
            model.updatePage = updatePage;
            model.deletePage = deletePage;
        }

        init();

        function updatePage() {
            pageService.updatePage(model.pageId, model.page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');

        }

        function deletePage() {
            pageService.deletePage(model.pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();