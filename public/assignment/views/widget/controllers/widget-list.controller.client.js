(function() {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce) {
        var model = this;

        function trust(html) {
            // diligence to scrub any unsafe content
            return  $sce.trustAsHtml(html);
        }

        function getYoutubeUrl(youtubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youtubeLinkParts = youtubeLink.split('/');
            var id = youtubeLinkParts[youtubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

    }
})();