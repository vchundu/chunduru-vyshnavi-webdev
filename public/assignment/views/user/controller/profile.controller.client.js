(function() {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController(userService, $routeParams, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "user updated successfully";
                });
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function() {
                    $location.url('/login');
                });
        }

        userService
            .findUserById(model.userId)
            .then(renderUser);

        function renderUser(user) {
            model.user = user;
        }




    }
})();