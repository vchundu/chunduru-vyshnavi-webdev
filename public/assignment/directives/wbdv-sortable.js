(function() {
    angular
        .module('WAM')
        .directive('wbdvSortable', wbdvSortableTag);

    function wbdvSortableTag($http, $routeParams) {
        function moveWidget(scope, element) {

            var start, end;
            var pageId = $routeParams['pageId'];
            $(element).sortable({
                axis: "y",
                update: function(event, ui) {
                    end = ui.item.index();
                    $http.put('/api/assignment/page/'+pageId+'/widget?initial='+start+"&final="+end)
                        .then(function(response) {
                            console.log('updated');
                        });

                },
                start: function(event, ui) {
                    start = ui.item.index();
                }
            });
        }

        return {
            link: moveWidget
        };
    }
})();