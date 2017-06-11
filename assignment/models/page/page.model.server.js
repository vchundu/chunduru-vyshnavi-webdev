var mongoose = require('mongoose');

var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);

module.exports = pageModel;
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

function createPage(page) {
    return pageModel.create(page);
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
    return pageModel.remove({_id: pageId});
}
