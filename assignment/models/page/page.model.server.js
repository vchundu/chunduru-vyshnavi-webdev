var mongoose = require('mongoose');

var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);

module.exports = pageModel;
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.removeWidget = removeWidget;

function createPage(page) {
    return pageModel
        .create(page)
        .then(function(page) {
            return websiteModel.addPage(page._website, page._id);
        });
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website : websiteId});
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, newPage) {
    return pageModel.update({_id : pageId}, newPage);
}

function deletePage(pageId) {
    pageModel
        .findPageById(pageId)
        .then(function(page) {
            websiteId = page._website;
            return pageModel
                .remove({_id:pageId})
                .then(function(status) {
                    return websiteModel
                        .removePage(websiteId, pageId);
                });
        });
}

function addWidget(pageId, widgetId) {

}

function removeWidget(pageId, widgetId) {

}
