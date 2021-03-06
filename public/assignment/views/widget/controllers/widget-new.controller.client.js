(function() {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams, currentUser, widgetService, $location) {
        var model = this;

        model.userId = currentUser['_id'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetType = $routeParams['widgetType'];

        function init() {
            model.getNewWidget = getNewWidget;
            model.createWidget = createWidget;
        }
        init();

        function getNewWidget() {
            return 'views/widget/templates/widget-create/widget-'+model.widgetType.toLowerCase()+'-create.view.client.html';
        }

        function createWidget(widget) {
            widget.widgetType = model.widgetType.toUpperCase();
            widgetService
                .createWidget(widget, model.pageId)
                .then(function (status) {
                    $location.url('/user/'
                                  +'/website/'+model.websiteId
                                  +'/page/'+model.pageId
                                  +'/widget');
                });
        }


    }
})();