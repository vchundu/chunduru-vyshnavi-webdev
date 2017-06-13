var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

module.exports = widgetModel;

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsOnPage = findAllWidgetsOnPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.moveWidget = moveWidget;

function createWidget(widget) {
    console.log('in create widget model');
    console.log(widget);
    return widgetModel
        .create(widget)
        .then(function(widget) {
            console.log('have created the widget model');
            return pageModel
                .addWidget(widget._page, widget._id);
        })
}

function findAllWidgetsOnPage (pageId) {
    return pageModel
        .findPageById(pageId)
        .populate('_widget')
        .exec();
    // return widgetModel.find({_page : pageId });
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, newWidget) {
    return widgetModel.update({_id : widgetId}, newWidget);
}

function deleteWidget(widgetId) {
    return widgetModel
        .findWidgetById(widgetId)
        .then(function(widget) {
            return widgetModel
                .remove({_id : widgetId})
                .then(function(status) {
                    return pageModel
                        .removeWidget(widget._page, widgetId);
                });
        });
}

function moveWidget(pageId, initial, end) {
    return pageModel
        .findPageById(pageId)
        .then(function(page) {
            console.log(page);
            page._widget.splice(end, 0, page._widget.splice(initial, 1)[0]);
            console.log(page);
            page.markModified('_widget');
            return page.save();
        });
}