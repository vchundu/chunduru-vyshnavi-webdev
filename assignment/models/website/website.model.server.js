var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

module.exports = websiteModel;
websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;

function createWebsite(website) {
    return websiteModel.create(website);
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user : userId});
}