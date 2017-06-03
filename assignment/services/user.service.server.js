// these are all of the web services of this application

var app = require('../../express'); // this will go to the express.js file (get this from the video)

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

    var user = users.find(function(user) {
        return user.username === username &&
            user.password === password;
    });

    if (typeof user === "undefined") {
        res.sendStatus(404); //resource is not found error
        return;
    } else {
        res.json(user);
        return;
    }
}

app.get('/api/assignment/username/user', findUserByUsername);

function findUserByUsername(req, res) {
    var username = req.query['username'];

    var user = users.find(function(user) {
        return user.username === username &&
            user.password === password;
    });

    if (typeof user === "undefined") {
        res.sendStatus(404); //resource is not found error
        return;
    } else {
        res.json(user);
        return;
    }
}

//path parameters
app.get('/api/assignment/user/:userId', findUserById);

function findUserById(req, res) {
    var userId = req.params['userId'];
    var user = users.find(function (user) {
        return user._id === userId;
    });
    if (typeof user === "undefined") {
        res.sendStatus(404);
        return;
    } else {
        res.json(user);
        return;
    }
}


app.post('/api/assignment/user', createUser);

function createUser(req, res) {
    var user= req.body;
    user._id = (new Date()).getTime() + "";
    users.push(user);
    res.json(user);
}

app.put('/api/assignment/user/:userId', updateUser);

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params['userId'];

    for(var u in users) {
        if (userId === users[u]._id) {
            users[u] = user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

app.delete('/api/assignment/user/:userId', deleteUser);

function deleteUser(req, res) {
    var userId = req.params['userId'];

    var user = users.find(function(user) {
        return userId === user["_id"];
    });

    if (typeof user === "undefined") {
        res.sendStatus(404);
    } else {
        var index = users.indexOf(user);
        users.splice(index, 1);
        res.sendStatus(200);
    }

}
