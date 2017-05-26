(function() {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController(userService, $location) {

        var model  = this;

        model.checkLogin = function(username, password) {

            var user = userService.findUserByCredentials(username, password);
            if (user !== null) {
                $location.url("/user/"+user['_id']);
            } else {
                model.message = "Sorry, username " + username + " was not found";
            }
        }
    }
})();