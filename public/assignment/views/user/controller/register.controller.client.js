(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController(userService, $location) {

        var model = this;
        model.register = register;
        model.message = "";
        function register(username, password, verifyPassword, email, firstName, lastName) {

            if (password !== verifyPassword) {
                model.message = "Your passwords do not match";
            }
            else {
                userService
                    .findUserByUsername(username)
                    .then(userFound, userNotFound);
            }

            function userFound(user) {
                model.message = "Sorry, the username " + username + " already exists";
            }

            function userNotFound(error) {
                var user = {
                    username: username,
                    password: password,
                    email: email,
                    firstName: firstName,
                    lastName: lastName
                };
                userService
                    .createUser(user)
                    .then(createdUser, failure);
            }

            function createdUser(user) {
                $location.url('/user/'+user._id);
            }

            function failure(error) {
                console.log(error.statusCode);
            }


        }
    }
})();