

var widgets = {
    "grid": {
        title: "GRID SYSTEM",
        widgets: {}
    },

    "component": {
        title: "Component",
        widgets: {}
    }
};

Meteor.widget = function(widgetName, title, groupName, tpl, params) {
    if (!widgetName) return;

    if (!groupName) throw new Error("Need group praram");

    var group = widgets[groupName];

    if (!tpl) {
        var ret = group.widgets[widgetName];
        return ret;
    }
    else {
        group.widgets[widgetName] = {title: title, template: {func: tpl, params: params}};
    }
}

Meteor.getWidgets = function(groupName) {
    if (groupName) {return widgets[groupName]};
    return widgets;
}
