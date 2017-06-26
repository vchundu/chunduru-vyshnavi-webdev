// javascript running on the server
var app = require('../express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

// checks connection
var connectionString = 'mongodb://localhost/webdev_assignment'; // for local

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds137101.mlab.com:37101/heroku_ppjl6vwp'; // use yours
}
mongoose.connect(connectionString);

app.use(bodyParser.json());

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');
