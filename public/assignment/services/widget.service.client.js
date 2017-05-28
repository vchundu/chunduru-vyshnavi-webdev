(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService);

    function widgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "555", "widgetType": "HEADING", "pageId": "123", "size": 1, "text": "Vyshnavi"},
            { "_id": "565", "widgetType": "HEADING", "pageId": "123", "size": 2, "text": "Chunduru"},
            { "_id": "575", "widgetType": "HEADING", "pageId": "123", "size": 3, "text": "HTML"},
            { "_id": "585", "widgetType": "IMAGE", "pageId": "123", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "123", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
        ];

        var api = {
            createWidget : createWidget,
            deleteWidget : deleteWidget,
            updateWidget : updateWidget,
            findWidget : findWidget,
            findAllWidgetsOnPage: findAllWidgetsOnPage
        };

        return api;

        function createWidget(widget, pageId) {
            widget._id = new Date().getTime();
            widget.pageId = pageId;
        }

        function deleteWidget(widgetId) {
            var oldWidget = widgets.find(function(widget) {
               return widget["_id"] === widgetId;
            });

            if (typeof oldWidget === "undefined") {
                // do nothing
            } else {
                var index = widgets.indexOf(oldWidget);
                widgets.splice(index, 1);
            }
        }

        function updateWidget(widgetId, newWidget) {
            var oldWidget = widgets.find(function(widget) {
                return widget["_id"] === widgetId;
            });

            if (typeof oldWidget === "undefined") {
                // do nothing
            } else {
                var index = widgets.indexOf(oldWidget);
                widgets.splice(index, 1, newWidget);
            }
        }

        function findWidget(widgetId) {
            var widget = widgets.find(function(widget) {
                return widget["_id"] === widgetId;
            });

            if (typeof widget === "undefined") {
                return null;
            } else {
                return widget;
            }
        }

        function findAllWidgetsOnPage(pageId) {
            return widgets.filter(function (widget) {
               return widget["pageId"] === pageId;
            });
        }

    }
})();