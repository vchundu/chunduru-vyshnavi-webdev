(function () {
    angular
        .module('WAM')
        .factory('userService', userService);

    // makes all of the data private to this factory/service
    function userService($http) {

        var api = {
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            deleteUser: deleteUser,
            createUser:  createUser,
            updateUser: updateUser,
            login: login,
            checkLoggedIn: checkLoggedIn,
            logout: logout,
            register: register
        };


        // returns all of the functionality of this factory
        return api;

        // finds a user by the given user id
        function findUserById(userId) {
            var url = "/api/assignment/user/" + userId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
            });
        }

        // finds a user by the given username and password
        function findUserByCredentials(username, password) {
            var url = "/api/assignment/credentials/user?username="+username+"&password="+password;

            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });

        }

        function findUserByUsername(username) {
            var url = "/api/assignment/username/user?username="+username;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        // we use api to namespace our calls and so we prepend shit
        // Creates a new user and gives it an id
        function createUser(user) {
            var url="/api/assignment/user";
            return $http.post(url, user)
                  .then(function(response) {
                      return response.data;
                  });
        }

        function updateUser(userId, user) {
            var url ="/api/assignment/user/"+userId;
            return $http.put(url, user)
                .then(function(response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url ="/api/assignment/user/"+userId;
            return $http.delete(url)
                .then(function(response) {
                    // do shit;
                });
        }

        function login(username, password) {
            var url="/api/assignment/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
        }

        function checkLoggedIn() {
            var url = "/api/assignment/checkLoggedIn";
            return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
        }

        function logout() {
            var url = "/api/assignment/logout";

        }
    }
})();