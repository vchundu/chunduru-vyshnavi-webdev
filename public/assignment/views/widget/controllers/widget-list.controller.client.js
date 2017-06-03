(function() {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce, $routeParams, widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function init() {
            model.getYoutubeUrl = getYoutubeUrl;
            model.trust = trust;
            model.getWidgetUrlByType = getWidgetUrlByType;
            widgetService
                .findAllWidgetsOnPage(model.pageId)
                .then(foundWidgets, failure);
        }
        init();

        function foundWidgets(widgets) {
            model.widgets = widgets;
        }

        function failure(error) {
            // todo
        }

        function trust(html) {
            // diligence to scrub any unsafe content
            return $sce.trustAsHtml(html);
        }

        function getYoutubeUrl(youtubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youtubeLinkParts = youtubeLink.split('/');
            var id = youtubeLinkParts[youtubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function getWidgetUrlByType(widgetType) {
            return 'views/widget/templates/widget-templates/widget-'+widgetType.toLowerCase()+'-temp.view.client.html';
        }

    }
})();