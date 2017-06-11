var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

module.exports = websiteModel;
websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

function createWebsite(website) {
    return websiteModel.create(website);
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user : userId});
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, newWebsite) {
    return websiteModel.update({_id: websiteId}, newWebsite);
}

function deleteWebsite(websiteId) {
    return websiteModel.remove({_id : websiteId});
}