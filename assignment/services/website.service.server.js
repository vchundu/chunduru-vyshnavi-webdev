var app = require("../../express"); // basically find the express fle
var websiteModel = require("../models/website/website.model.server");

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);

function findAllWebsitesForUser(req, res) {

    websiteModel
        .findAllWebsitesForUser(req.params['userId'])
        .then(function(websites) {
            res.json(websites);
        });
}

app.post('/api/assignment/user/:userId/website', createWebsite);

function createWebsite(req, res) {
    var website = req.body;
    websiteModel
        .createModel(website)
        .then(function(website) {
            res.json(website);
        });
}

app.get('/api/assignment/website/:websiteId', findWebsiteById);

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];

    var website = websites.find(function(web) {
        return web._id === websiteId;
    });

    if (typeof website === "undefined") {
        res.sendStatus(404);
    } else {
        res.json(website);
    }
}

app.put('/api/assignment/website/:websiteId', updateWebsite);

function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params['websiteId'];

    for(var w in websites) {
        if (websiteId === websites[w]._id) {
            websites[w] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

app.delete('/api/assignment/website/:websiteId', deleteWebsite);

function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var oldWebsite = websites.find(function(website) {
        return website['_id'] === websiteId;
    });

    if (typeof oldWebsite === "undefined") {
        res.sendStatus(404);
    } else {
        var index = websites.indexOf(oldWebsite);
        websites.splice(index, 1);
        res.sendStatus(200);
    }
}
