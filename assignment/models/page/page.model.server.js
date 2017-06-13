var mongoose = require('mongoose');

var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);
var websiteModel = require('../website/website.model.server');

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
    return pageModel
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
    console.log('in page add widget');
    return pageModel
        .findById(pageId)
        .then(function(page) {
            console.log('widget has been added to page');
            page._widget.push(widgetId);
            return page.save();
        })
}

function removeWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function(page) {
            var index = page._widget.indexOf(widgetId);
            page._widget.splice(index,1);
            return page.save();
        });
}
