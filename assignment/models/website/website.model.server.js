var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
var userModel = require('../user/user.model.server');

module.exports = websiteModel;
websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.removePage = removePage;

function createWebsite(website) {
    return websiteModel
        .create(website)
        .then(function(website) {
            return userModel
                .addWebsite(website._user, website._id);
        });

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
    console.log('inside deleteWebsite');
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function(website) {
            userId = website._user;
            return websiteModel
                .remove({_id : websiteId})
                .then(function(status) {
                    console.log('have removed the website');
                    return userModel
                        .removeWebsite(userId, websiteId);
                })
        });
}

function addPage(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function(website) {
            website._page.push(pageId);
            return website.save();
        })
}

function removePage(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function(website) {
            var index = website._page.indexOf(pageId);
            website._page.splice(index, 1);
            return website.save();
        })
}