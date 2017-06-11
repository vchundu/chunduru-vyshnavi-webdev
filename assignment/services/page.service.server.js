var app = require("../../express");
var pageModel = require("../models/page/page.model.server");

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
    { "_id": "123", "name": "Post 4", "websiteId": "789", "description": "Lorem" },
    { "_id": "234", "name": "Post 5", "websiteId": "789", "description": "Lorem" }
];

app.post('/api/assignment/website/:websiteId/page', createPage);

function createPage(req, res) {
    var page = req.body;

    pageModel
        .createPage(page)
        .then(function(page) {
            res.json(page);
        });

    //
    // page._id = new Date().getTime() + "";
    // pages.push(page);
    // res.json(page);
}

app.get('/api/assignment/website/:websiteId/page', findAllPagesForWebsite);

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params['websiteId'];

    pageModel
        .findAllPagesForWebsite(req.params['websiteId'])
        .then(function(pages) {
            res.json(pages);
        }, function(error) {
            res.sendStatus(404);
        })
    //
    // var resultSet = pages.filter(function(page) {
    //     return page["websiteId"] === websiteId;
    // });
    //
    // res.json(resultSet);
}

app.get('/api/assignment/page/:pageId', findPageById);

function findPageById(req, res) {
    var pageId =  req.params['pageId'];

    pageModel
        .findPageById(req.params['pageId'])
        .then(function(page) {
            res.json(page);
        }, function(error) {
            res.sendStatus(404);
        })
    // var page = pages.find(function(page) {
    //     return page["_id"] === pageId;
    // });
    //
    // if (typeof page === "undefined") {
    //     res.sendStatus(404);
    // } else {
    //     res.json(page);
    // }
}

app.put('/api/assignment/page/:pageId', updatePage);

function updatePage(req, res) {
    var pageId = req.params['pageId'];
    var newPage = req.body;

    pageModel
        .updatePage(pageId, newPage)
        .then(function(response) {
            res.sendStatus(200);
        }, function(error) {
            res.sendStatus(404);
        });
    //
    // var oldPage = pages.find(function(page) {
    //     return pageId === page['_id'];
    // });
    //
    // if (typeof oldPage === "undefined") {
    //     res.sendStatus(404);
    // } else {
    //     var index = pages.indexOf(oldPage);
    //     pages.splice(index, 1, newPage);
    //     res.sendStatus(200);
    // }
}

app.delete('/api/assignment/page/:pageId', deletePage);

function deletePage(req, res) {
    var pageId = req.params['pageId'];

    pageModel
        .deletePage(pageId)
        .then(function(response) {
            res.sendStatus(200);
        }, function(error) {
            res.sendStatus(404);
        })
    // var page = pages.find(function(page) {
    //     return page['_id'] === pageId;
    // });
    // if (typeof page === "undefined") {
    //     res.sendStatus(404);
    // } else {
    //     var index = pages.indexOf(page);
    //     pages.splice(index,1);
    //     res.sendStatus(200);
    // }
}