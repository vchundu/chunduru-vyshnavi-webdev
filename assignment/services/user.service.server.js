// these are all of the web services of this application

var app = require('../../express'); // this will go to the express.js file (get this from the video)
var userModel = require('../models/user/user.model.server');
var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@gmail.com"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@gmail.com" },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@gmail.com"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jannuzi@gmail.com" }
];


// query parameters
app.get('/api/assignment/credentials/user', findUserByCredentials);

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    userModel
        .findUserByCredentials(username, password)
        .then(function(user) {
            if (user !== null) {
                res.json(user);
            }
        }, function(err) {
            res.sendStatus(404);
        });
    // var user = users.find(function(user) {
    //     return user.username === username &&
    //         user.password === password;
    // });
    //
    // if (typeof user === "undefined") {
    //     res.sendStatus(404); //resource is not found error
    //     return;
    // } else {
    //     res.json(user);
    //     return;
    // }
}

app.get('/api/assignment/username/user', findUserByUsername);

function findUserByUsername(req, res) {
    var username = req.query['username'];

    userModel
        .findUserByUsername(req.query['username'])
        .then(function(user) {
           res.json(user);
        }, function(error) {
            res.sendStatus(404);
        });

    //
    // var user = users.find(function(user) {
    //     return user.username === username &&
    //         user.password === password;
    // });
    //
    // if (typeof user === "undefined") {
    //     res.sendStatus(404); //resource is not found error
    //     return;
    // } else {
    //     res.json(user);
    //     return;
    // }
}

//path parameters
app.get('/api/assignment/user/:userId', findUserById);

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function(user) {
            res.json(user);
        }, function(error) {
            res.sendStatus(404);
        });
}


app.post('/api/assignment/user', createUser);

function createUser(req, res) {
    var user= req.body;
    userModel
        .createUser(user)
        .then(function(user) {
            res.json(user);
        }, function(error) {
            res.sendStatus(404);
        });
}

app.put('/api/assignment/user/:userId', updateUser);

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params['userId'];

    userModel
        .updateUser(userId, user)
        .then(function(response) {
            res.sendStatus(200);
        }, function(error) {
            res.sendStatus(404);
        });
}

app.delete('/api/assignment/user/:userId', deleteUser);

function deleteUser(req, res) {
    var userId = req.params['userId'];

    userModel
        .deleteUser(userId)
        .then(function(response) {
            res.sendStatus(200);
        }, function(error) {
            res.sendStatus(404);
        });

}
