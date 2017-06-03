var app = require("../../express");

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
    page._id = new Date().getTime() + "";
    pages.push(page);
    console.log(pages);
    res.json(page);
}

app.get('/api/assignment/website/:websiteId/page', findAllPagesForWebsite);

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params['websiteId'];

    var resultSet = pages.filter(function(page) {
        return page["websiteId"] === websiteId;
    });

    res.json(resultSet);
}

app.get('/api/assignment/page/:pageId', findPageById);

function findPageById(req, res) {
    var pageId =  req.params['pageId'];

    var page = pages.find(function(page) {
        return page["_id"] === pageId;
    });

    if (typeof page === "undefined") {
        console.log('in here');
        res.sendStatus(404);
    } else {
        res.json(page);
    }
}

app.put('/api/assignment/page/:pageId', updatePage);

function updatePage(req, res) {
    var pageId = req.params['pageId'];
    var newPage = req.body;

    var oldPage = pages.find(function(page) {
        return pageId === page['_id'];
    });

    if (typeof oldPage === "undefined") {
        res.sendStatus(404);
    } else {
        var index = pages.indexOf(oldPage);
        pages.splice(index, 1, newPage);
        res.sendStatus(200);
    }
}

app.delete('/api/assignment/page/:pageId', deletePage);

function deletePage(req, res) {
    var pageId = req.params['pageId'];
    var page = pages.find(function(page) {
        return page['_id'] === pageId;
    });
    if (typeof page === "undefined") {
        res.sendStatus(404);
    } else {
        var index = pages.indexOf(page);
        pages.splice(index,1);
        res.sendStatus(200);
    }
}