(function() {
    angular
        .module('WAM')
        .directive('wbdvSortable', wbdvSortableTag);

    function wbdvSortableTag() {
        alert('is trigger');
        function moveWidget(scope, element, attrs) {
            $(element).sortable();
        }

        return {
            link: moveWidget,
        };
    }
})();