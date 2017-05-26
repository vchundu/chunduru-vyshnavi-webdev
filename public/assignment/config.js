(function() {
    angular
        .module('WAM')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/login', {
                templateUrl: 'views/user/template/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'loginVm'
            })
            .when('/register', {
                templateUrl: 'views/user/template/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'registerVm'
            })
            .when('/user/:userId', {
                templateUrl: 'views/user/template/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'profileVm'
            });
    }
})();