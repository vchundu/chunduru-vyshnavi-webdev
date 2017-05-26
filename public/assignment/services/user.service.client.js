(function () {
    angular
        .module('WAM')
        .factory('userService', userService);

    // makes all of the data private to this factory/service
    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@gmail.com"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@gmail.com" },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@gmail.com"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jannuzi@gmail.com" }
        ];


        var api = {
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            // deleteUser: deleteUser,
            createUser:  createUser
            // updateUser: updateUser
        };


        // returns all of the functionality of this factory
        return api;

        // finds a user by the given user id
        function findUserById(userId) {
            var user = users.find(function (user) {
                return user._id === userId;
            });
            if (typeof user === "undefined") {
                return null;
            } else {
                return user;
            }
        }

        // finds a user by the given username and password
        function findUserByCredentials(username, password) {
            var user = users.find(function(user) {
                return user.username === username && user.password === password;
            });

            if (typeof user === "undefined") {
                return null;
            } else {
                return user;
            }
        }

        function findUserByUsername(username) {
            var user = users.find(function(user) {
                return user.username === username;
            });
            if (typeof user === "undefined") {
                return null;
            } else {

                return user;
            }
        }

        // Creates a new user and gives it an id
        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
        }
    }
})();