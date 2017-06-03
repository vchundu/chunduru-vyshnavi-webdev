// javascript running on the server
var app = require('../express');
var bodyParser = require('body-parser');
var multer = require('multer');


app.use(bodyParser.json());

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');
