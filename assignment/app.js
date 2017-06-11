// javascript running on the server
var app = require('../express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise; // there's more code than this, pull it from github
mongoose.connect('mongodb://localhost/webdev_assignment');

app.use(bodyParser.json());

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');
