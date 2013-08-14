/**
 * Created with JetBrains WebStorm.
 * User: zhanghaojie
 * Date: 13-8-9
 * Time: AM7:41
 * To change this template use File | Settings | File Templates.
 */

Template.tpl_leftsidebar.helpers({
    sidebarList: function() {
        return Meteor.getWidgets();
    }
});


Template.tpl_leftsidebar.rendered = function() {
    var draggableNodes = this.findAll(".lyrow");
    var dragHelper = function(node) {
        return function() {
            return $($(node).next()).children().clone();
        }
    };

    _.each(draggableNodes, function(node) {
        $(node).draggable({
            helper: "clone",
            connectToSortable: ".demo",
            appendTo: "#editor",
            drag: function(e, t) {
                t.helper.width(400)
            },
            drop: function(e, t) {
                $(".demo .column").sortable({opacity: .35,connectWith: ".column"})
            }});
    })

    $(".demo, .demo .column").sortable({connectWith: ".column",opacity: .35,handle: ".drag"});
}
