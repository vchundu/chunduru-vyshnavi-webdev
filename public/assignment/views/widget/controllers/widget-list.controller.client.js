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
            model.widgets = widgetService.findAllWidgetsOnPage(model.pageId);
        }

        init();

        function trust(html) {
            // diligence to scrub any unsafe content
            return  $sce.trustAsHtml(html);
        }

        function getYoutubeUrl(youtubeLink) {
            console.log('triggered');
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