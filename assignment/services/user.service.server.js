// these are all of the web services of this application

var app = require('../../express'); // this will go to the express.js file (get this from the video)
var userModel = require('../models/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

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
            if (user === null) {
                res.sendStatus(404);
            } else {
                res.json(user);
            }
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

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if(user.username === username && user.password === password) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

app.post('/api/assignment/login', passport.authenticate('local'), login);

function login(req, res) {
    var user = req.user;
    res.json(user);
}


function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

app.get('/api/assignment/checkLoggedIn', checkLoggedIn);

app.post('/api/assignment/logout', logout);

app.post('/api/assignment/register', register);

function register(req, res) {
    var user = req.body;
        userModel
           .createUser(user)
           .then(function (user) {
                   req.login(user, function (status) {
                            res.json(user);
                        });
                });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function checkLoggedIn(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}