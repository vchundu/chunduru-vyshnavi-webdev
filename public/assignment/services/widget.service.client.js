(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService);

    function widgetService($http) {
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
            { "_id": "799", "widgetType": "HTML", "pageId": "123", "text": "<p>Lorem ipsum</p>"},
            { "_id": "555", "widgetType": "HEADING", "pageId": "123", "size": 1, "text": "Vyshnavi"},
            { "_id": "565", "widgetType": "HEADING", "pageId": "123", "size": 2, "text": "Chunduru"},
            { "_id": "575", "widgetType": "HEADING", "pageId": "123", "size": 3, "text": "HTML"},
            { "_id": "585", "widgetType": "IMAGE", "pageId": "123", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "450", "widgetType": "YOUTUBE", "pageId": "123", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" }
        ];

        return {
            createWidget : createWidget,
            deleteWidget : deleteWidget,
            updateWidget : updateWidget,
            findWidgetById : findWidgetById,
            findAllWidgetsOnPage: findAllWidgetsOnPage
        };

        function createWidget(widget, pageId) {
            widget._page = pageId;
            var url = "/api/assignment/page/:pageId/widget";
            return $http.post(url, widget)
                .then(function(response) {
                    return response.data;
                });
        }

        function deleteWidget(widgetId) {
            var url = "/api/assignment/widget/"+widgetId;
            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function updateWidget(widgetId, newWidget) {
            var url = "/api/assignment/widget/"+widgetId;
            return $http.put(url, newWidget)
                .then(function(response) {
                   return response.data;
                });
        }

        function findWidgetById(widgetId) {
            var url = "/api/assignment/widget/"+widgetId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function findAllWidgetsOnPage(pageId) {
            var url = "/api/assignment/page/"+pageId+"/widget";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

    }
})();