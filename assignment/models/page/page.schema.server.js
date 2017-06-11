var mongoose = require('mongoose');

// todo do i need page title and if so i need to implement it everywhere fuck
var pageSchema = mongoose.Schema({
    _website : {type: mongoose.Schema.ObjectId, ref: "WebsiteModel"},
    name: String,
    title: String,
    dateCreated : {type: Date, default: Date.now}
}, {collection: 'page'});

module.exports = pageSchema;