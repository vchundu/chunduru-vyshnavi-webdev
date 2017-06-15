(function() {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController(currentUser, userService, $routeParams, $location) {

        var model = this;
        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logout = logout;
        model.user = currentUser;
        model.userId = currentUser['_id'];

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "user updated successfully";
                });
        }

        function unregister() {
            userService
                .unregister()
                .then(function() {
                    $location.url('/login');
                });
        }

        function logout() {
            userService
                .logout()
                .then(function(response) {
                    $location.url('/');
                });
        }






    }
})();