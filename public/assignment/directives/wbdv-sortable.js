(function() {
    angular
        .module('WAM')
        .directive('wbdvSortable', wbdvSortableTag);

    function wbdvSortableTag() {
        function moveWidget(scope, element, attrs) {
            console.log(element);
            console.log(attrs);
            $(element).sortable();
        }

        return {
            link: moveWidget,
        };
    }
})();