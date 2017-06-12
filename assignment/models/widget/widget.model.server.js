var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);

module.exports = widgetModel;

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsOnPage = findAllWidgetsOnPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;

function createWidget(widget) {
    return widgetModel
        .create(widget)
        .then(function(widget) {
            return pageModel
                .addWidget(widget._page, widget._id);
        })
}

function findAllWidgetsOnPage (pageId) {
    return widgetModel.find({_page : pageId });
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, newWidget) {
    return widgetModel.update({_id : widgetId}, newWidget);
}

function deleteWidget(widgetId) {
    widgetModel
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