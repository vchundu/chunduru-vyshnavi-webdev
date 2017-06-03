(function() {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams, widgetService, $location) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        model.editWidgetContent = editWidgetContent;

        function init() {
            widgetService
                .findWidgetById(model.widgetId)
                .then(function(widget) {
                    model.widget = angular.copy(widget);
                });
        }

        init();

        function updateWidget(widget) {
            widgetService
                .updateWidget(model.widgetId, widget)
                .then(function(status) {
                    $location.url('/user/'+model.userId
                        +'/website/'+model.websiteId
                        +'/page/'+model.pageId+'/widget');
                });
        }

        function deleteWidget() {
            widgetService
                .deleteWidget(model.widgetId)
                .then(function(status) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });
        }

        //TODO
        function editWidgetContent() {
            return 'views/widget/templates/widget-edit/widget-'
                       +model.widget.widgetType.toLowerCase()
                       +'-edit.view.client.html';
        }
    }
})();