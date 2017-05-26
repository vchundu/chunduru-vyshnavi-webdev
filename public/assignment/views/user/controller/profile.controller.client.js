(function() {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController(userService, $routeParams) {

        var model = this;
        var userId = $routeParams['userId'];

        console.log(userId);
        model.user = userService.findUserById(userId);
        console.log(model.user);





    }
})();