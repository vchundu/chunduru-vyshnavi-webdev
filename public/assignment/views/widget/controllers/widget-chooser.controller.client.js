(function() {
    angular
        .module('WAM')
        .controller('widgetChooserController', widgetChooserController);

    function widgetChooserController(currentUser,$routeParams) {
        var model = this;

        model.userId = currentUser['_id'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

    }
})();