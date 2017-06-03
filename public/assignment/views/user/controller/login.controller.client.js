(function() {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController(userService, $location) {

        var model  = this;

        model.checkLogin = function(username, password) {
            userService
                .findUserByCredentials(username, password)
                .then(login,handleError); //success function, error function

            function login (user) {
                $location.url("/user/"+user['_id']);
            }

            function handleError(error) {
                model.message = "Sorry, username " + username + " was not found";
            }
        }
    }
})();