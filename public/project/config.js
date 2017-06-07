(function() {
    angular
        .module('VSpotify')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'homePageController',
                controllerAs: 'model'
            })
    }
})();