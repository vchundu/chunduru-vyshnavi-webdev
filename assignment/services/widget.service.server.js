var app = require('../../express');
var widgetModel = require('../models/widget/widget.model.server');
var pageModel = require('../models/page/page.model.server');

// for image file uploads
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "799", "widgetType": "HTML", "pageId": "123", "text": "<p>Lorem ipsum</p>"},
    { "_id": "555", "widgetType": "HEADING", "pageId": "123", "size": 1, "text": "Vyshnavi"},
    { "_id": "565", "widgetType": "HEADING", "pageId": "123", "size": 2, "text": "Chunduru"},
    { "_id": "575", "widgetType": "HEADING", "pageId": "123", "size": 3, "text": "HTML"},
    { "_id": "585", "widgetType": "IMAGE", "pageId": "123", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "450", "widgetType": "YOUTUBE", "pageId": "123", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" }
];

app.post('/api/assignment/page/:pageId/widget', createWidget);

function createWidget(req, res) {
    var widget = req.body;
    widgetModel
        .createWidget(widget)
        .then(function(widget) {
            res.json(widget);
        }, function(error) {
            res.sendStatus(404);
        });
}

app.get('/api/assignment/page/:pageId/widget', findAllWidgetsForPage);

function findAllWidgetsForPage(req, res) {


    widgetModel
        .findAllWidgetsOnPage(req.params['pageId'])
        .then(function(page) {
            res.json(page._widget);
        }, function(error) {
            res.sendStatus(404);
        });
}

app.get('/api/assignment/widget/:widgetId', findWidgetById);

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];

    widgetModel
        .findWidgetById(widgetId)
        .then(function(widget) {
            res.json(widget);
        }, function(error) {
            res.sendStatus(404);
        });
}

app.put('/api/assignment/widget/:widgetId', updateWidget);

function updateWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var newWidget = req.body;

    widgetModel
        .updateWidget(widgetId, newWidget)
        .then(function(widget) {
            res.sendStatus(200);
        }, function(error) {
            res.sendStatus(404);
        });
}

app.put('/api/assignment/page/:pageId/widget', moveWidget);

function moveWidget(req, res) {
    var pageId = req.params['pageId'];
    var initial = req.query['initial'];
    var final = req.query['final'];

    console.log(initial);
    console.log(final);
    widgetModel
        .moveWidget(pageId,initial, final)
        .then(function(response) {
            res.sendStatus(200);
        }, function(error) {
            res.sendStatus(404);
        });

    // var widgetsOnPage = widgets.filter(function(widget) {
    //     return widget['pageId'] === pageId;
    // });
    //
    //  var widget = widgetsOnPage.splice(initial, 1)[0];
    //  var indexOfWidget = widgets.indexOf(widget);
    //  widgets.splice(indexOfWidget, 1);
    //  finalNum = parseInt(final);
    //  var index = widgets.indexOf(widgetsOnPage[finalNum]);
    //  widgets.splice(index, 0, widget);

     res.sendStatus(200);
}

app.delete('/api/assignment/widget/:widgetId', deleteWidget);

function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];

    widgetModel
        .deleteWidget(widgetId)
        .then(function(response) {
            res.sendStatus(200);
        }, function(error) {
            res.sendStatus(404);
        });
}

app.post('/api/assignment/upload', upload.single('myFile'), uploadImage);

// todo think about how buttons work on this page
function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    if (widgetId === "") {
        widget = {
            "_id": new Date().getTime() + "",
            "widgetType": "IMAGE",
            "pageId": pageId,
            "width": width,
            "name": req.body.name,
            "text": req.body.text
        };
        widgetId = widget._id;
        widget.url = 'uploads/'+filename;
        widgetModel
            .createWidget(widget)
            .then(function(widget) {
                var callbackUrl = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/";
                res.redirect(callbackUrl);
            }, function(error) {
                res.sendStatus(404);
            });
    } else {
        widgetModel
            .findWidgetById(widgetId)
            .then(function(widget) {
                widget.url = 'uploads/'+filename;
                widgetModel
                    .updateWidget(widgetId, widget)
                    .then(function(widget) {
                        var callbackUrl = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/";
                        res.redirect(callbackUrl);
                    }, function(error) {
                        res.sendStatus(404);
                    });
            })
    }
}



