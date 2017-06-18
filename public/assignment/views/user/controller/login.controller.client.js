(function() {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController(userService, $location) {

        var model  = this;

        model.checkLogin = function(username, password) {
            userService
                .login(username, password)
                .then(login,handleError); //success function, error function

            function login (user) {
                $location.url("/profile");
            }

            function handleError(error) {
                model.message = "Sorry, username " + username + " was not found";
            }
        }
    }
})();