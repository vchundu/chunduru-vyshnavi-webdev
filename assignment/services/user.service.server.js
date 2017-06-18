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
        .then(function(user) {
            console.log(user);
                if(user.username === username) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                console.log('in error');
                if (err) { return done(err); }
            }
        );
}

app.post('/api/assignment/login', passport.authenticate('local'), login);

function login(req, res) {
    res.json(req.user);
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

app.post('/api/assignment/logout', logout);

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

app.get('/api/assignment/checkLoggedIn', checkLoggedIn);

function checkLoggedIn(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

app.delete('/api/assignment/unregister', unregister);

function unregister(req, res) {
    userModel
        .deleteUser(req.user._id)
        .then(function(response) {
            req.logout();
            res.sendStatus(200);
        })
}

var googleConfig;
if(process.env.MLAB_USERNAME_WEBDEV) {
    googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CLIENT_REDIRECT
    };
} else {
    googleConfig = {
        clientID: "271013544697-9n0uv070apalnsva7rf70r9f4sf2u5v6.apps.googleusercontent.com",
        clientSecret: "WglZbatLyOYu5VlBJGOVS2i9",
        callbackURL: "http://localhost:3000/auth/google/callback"
    }
}
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));


app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
    }));

passport.use(new GoogleStrategy(googleConfig, googleStrategy));

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}