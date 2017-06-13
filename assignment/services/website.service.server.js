var app = require("../../express"); // basically find the express fle
var websiteModel = require("../models/website/website.model.server");

/* TODO
 * add in error cases
 * fix up everything wrong with assignment 4
 * add flickr to createimage widget
 * fix the developerId if it ever comes up, websiteId, pageId
 */

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
        }, function(error) {
            res.sendStatus(404);
        });
}

app.post('/api/assignment/user/:userId/website', createWebsite);

function createWebsite(req, res) {
    var website = req.body;
    websiteModel
        .createWebsite(website)
        .then(function(website) {
            res.json(website);
        }, function(error) {
            res.sendStatus(404);
        });
}

app.get('/api/assignment/website/:websiteId', findWebsiteById);

function findWebsiteById(req, res) {

    websiteModel
        .findWebsiteById(req.params['websiteId'])
        .then(function(user) {
            res.json(user);
        }, function(error) {
            res.sendStatus(404);
        });

}

app.put('/api/assignment/website/:websiteId', updateWebsite);

function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params['websiteId'];

    websiteModel
        .updateWebsite(websiteId, website)
        .then(function(website) {
            res.sendStatus(200);
        }, function(error) {
            res.sendStatus(404);
        });
}

app.delete('/api/assignment/website/:websiteId', deleteWebsite);

function deleteWebsite(req, res) {
    websiteModel
        .deleteWebsite(req.params['websiteId'])
        .then(function(response) {
            res.sendStatus(200);
        }, function(error) {
            res.sendStatus(404);
        });

}
