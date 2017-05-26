(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController(userService, $location) {

        var model = this;
        model.register = register;
        model.message = "";
        function register(username, password, verifyPassword, email, firstName, lastName) {
            console.log("hallo");

            if (password !== verifyPassword) {
                model.message = "Your passwords do not match";
            }
            else {
                var found = userService.findUserByUsername(username);

                if (found === null) {
                    // create the user
                    var user = {
                        username: username,
                        password: password,
                        email: email,
                        firstName: firstName,
                        lastName: lastName
                    };
                    userService.createUser(user);
                    $location.url('/user/'+user['_id']);
                } else {
                    model.message = "Sorry, the username " + username + " already exists";
                }
            }
        }
    }
})();